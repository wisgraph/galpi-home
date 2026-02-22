import os
import re

# Directory to search
search_dir = 'src'

# Replacements (Regex patterns)
# We want to identify (class_a) dark:(class_b) and keep only the dark style.
# Or (dark-style-class) dark:(light-style-class) and keep the dark style.

patterns = [
    # Backgrounds
    (r'(bg-[a-z0-9/.\-]+)\s+dark:(bg-[a-z0-9/.\-]+)', r'\2'),
    (r'(bg-[a-z0-9/.\-]+)\s+dark:(bg-[a-z0-9/.\-]+)', r'\2'), # repeat for triple classes if any
    
    # Text colors
    (r'(text-[a-z0-9/.\-]+)\s+dark:(text-[a-z0-9/.\-]+)', r'\2'),
    
    # Border colors
    (r'(border-[a-z0-9/.\-]+)\s+dark:(border-[a-z0-9/.\-]+)', r'\2'),
    
    # Hover states
    (r'(hover:bg-[a-z0-9/.\-]+)\s+dark:(hover:bg-[a-z0-9/.\-]+)', r'\2'),
    (r'(hover:text-[a-z0-9/.\-]+)\s+dark:(hover:text-[a-z0-9/.\-]+)', r'\2'),
    
    # Divide
    (r'(divide-[a-z0-9/.\-]+)\s+dark:(divide-[a-z0-9/.\-]+)', r'\2'),
    
    # Special cases for "inverted" dark mode where dark: leads to a light color
    # e.g., bg-slate-900 dark:bg-white -> we want bg-slate-900
    (r'bg-slate-9(?:00|50)\s+dark:bg-white', 'bg-slate-900'),
    (r'bg-white\s+dark:bg-slate-9(?:00|50)', 'bg-slate-900'),
    (r'text-white\s+dark:text-slate-9(?:00|50)', 'text-white'),
    (r'text-slate-9(?:00|50)\s+dark:text-white', 'text-white'),
]

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    
    # Aggressive replacement of common white-mode classes when they appear as base
    # and they have a dark: counterpart.
    
    # Simple replacement for common patterns found in the grep
    # bg-white dark:bg-slate-950 -> bg-slate-950
    new_content = re.sub(r'bg-white\s+dark:bg-slate-950', 'bg-slate-950', new_content)
    new_content = re.sub(r'bg-slate-50\s+dark:bg-slate-950', 'bg-slate-950', new_content)
    new_content = re.sub(r'bg-white\s+dark:bg-slate-900', 'bg-slate-900', new_content)
    new_content = re.sub(r'bg-white/70\s+dark:bg-slate-950/70', 'bg-slate-950/70', new_content)
    new_content = re.sub(r'text-slate-900\s+dark:text-white', 'text-white', new_content)
    new_content = re.sub(r'text-slate-500\s+dark:text-slate-400', 'text-slate-400', new_content)
    new_content = re.sub(r'border-slate-200\s+dark:border-slate-800', 'border-slate-800', new_content)
    new_content = re.sub(r'border-slate-200\s+dark:border-white/10', 'border-white/10', new_content)
    
    # Handle the "inverted" ones manually if found
    # src/components/hero/HeroTextSection.tsx: bg-slate-900 dark:bg-white -> bg-slate-900
    new_content = re.sub(r'bg-slate-900\s+dark:bg-white', 'bg-slate-900', new_content)
    new_content = re.sub(r'text-white\s+dark:text-slate-900', 'text-white', new_content)
    
    # Generic removal of dark: prefix for everything else (since we forced dark mode in the layout)
    # This might be risky but let's try it for color classes
    # new_content = re.sub(r'dark:([a-z0-9/.\-]+)', r'\1', new_content) 
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

# Walk through the directory
modified_files = []
for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            file_path = os.path.join(root, file)
            if process_file(file_path):
                modified_files.append(file_path)

print(f"Modified {len(modified_files)} files.")
