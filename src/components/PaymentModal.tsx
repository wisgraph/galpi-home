

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    plan: {
        name: string;
        price: string;
    };
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, plan }) => {
    const [step, setStep] = useState<'info' | 'success' | 'error'>('info');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    const [couponCode, setCouponCode] = useState('');
    const [couponDiscount, setCouponDiscount] = useState<{ type: string, amount: number, name?: string } | null>(null);
    const [couponError, setCouponError] = useState('');
    const [isVerifyingCoupon, setIsVerifyingCoupon] = useState(false);

    const handleVerifyCoupon = async () => {
        if (!couponCode.trim()) return;
        setIsVerifyingCoupon(true);
        setCouponError('');
        try {
            const response = await fetch('/api/payments/verify-coupon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: couponCode }),
            });
            const result = await response.json();
            if (result.valid) {
                setCouponDiscount(result.data);
                setCouponError('');
            } else {
                setCouponDiscount(null);
                setCouponError(result.message || '유효하지 않은 쿠폰입니다.');
            }
        } catch (err) {
            setCouponDiscount(null);
            setCouponError('쿠폰 조회 중 오류가 발생했습니다.');
        } finally {
            setIsVerifyingCoupon(false);
        }
    };

    // 기본 원화 가격
    const basePrice = 7000;
    let finalPrice = basePrice;
    if (couponDiscount) {
        if (couponDiscount.type === 'fixed') {
            finalPrice = Math.max(0, basePrice - couponDiscount.amount);
        } else if (couponDiscount.type === 'percent') {
            finalPrice = Math.max(0, Math.floor(basePrice * (1 - couponDiscount.amount / 100)));
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/payments/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    member_nm: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    product_nm: `Galpi ${plan.name} - Super Early Bird`,
                    message: '갈피 슈퍼 얼리버드 라이선스 결제 청구서입니다.',
                    price: basePrice, // 서버가 쿠폰을 재검증하여 최종 가격 산정
                    coupon_code: couponDiscount ? couponCode : undefined
                }),
            });

            const result = await response.json();

            if (result.success) {
                setShortUrl(result.data.shortURL);
                setStep('success');
            } else {
                setErrorMessage(result.error || '청구서 발송 중 오류가 발생했습니다.');
                setStep('error');
            }
        } catch (err) {
            setErrorMessage('서버와 통신 중 오류가 발생했습니다.');
            setStep('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-8 sm:p-10">
                            {step === 'info' && (
                                <>
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-black text-white mb-2">구매 정보 입력</h2>
                                        <p className="text-slate-400">결제 청구서(알림톡)를 받을 정보를 입력해주세요.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 px-1">
                                                성함
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="홍길동"
                                                className="w-full bg-slate-800 border-none rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-orange-500/50 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 px-1">
                                                전화번호
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="01012345678"
                                                className="w-full bg-slate-800 border-none rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-orange-500/50 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 px-1">
                                                이메일 (필수)
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="example@gmail.com"
                                                className="w-full bg-slate-800 border-none rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-orange-500/50 transition-all"
                                            />
                                        </div>

                                        <div className="pt-2 border-t border-slate-800/50">
                                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 px-1">
                                                할인 쿠폰
                                            </label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={couponCode}
                                                    onChange={(e) => {
                                                        setCouponCode(e.target.value);
                                                        if (couponDiscount) setCouponDiscount(null); // 코드가 바뀌면 기존 할인 취소
                                                    }}
                                                    placeholder="프로모션 코드를 입력하세요"
                                                    className="w-full bg-slate-800 border-none rounded-2xl px-5 py-3 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-orange-500/50 transition-all uppercase"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleVerifyCoupon}
                                                    disabled={isVerifyingCoupon || !couponCode}
                                                    className="px-6 bg-slate-700 text-white rounded-2xl font-bold whitespace-nowrap hover:bg-slate-600 transition-colors disabled:opacity-50"
                                                >
                                                    {isVerifyingCoupon ? <Loader2 className="animate-spin" size={18} /> : '적용'}
                                                </button>
                                            </div>
                                            {couponError && <p className="text-red-500 text-xs mt-2 px-1 font-medium">{couponError}</p>}
                                            {couponDiscount && (
                                                <p className="text-emerald-500 text-xs mt-2 px-1 font-bold flex items-center gap-1">
                                                    <CheckCircle2 size={12} />
                                                    {couponDiscount.name ? `${couponDiscount.name} 쿠폰이 적용되었습니다.` : '쿠폰이 적용되었습니다.'}
                                                </p>
                                            )}
                                        </div>

                                        <div className="bg-slate-950/50 rounded-2xl p-5 border border-slate-800 flex justify-between items-center">
                                            <span className="text-slate-400 font-medium">최종 결제 금액</span>
                                            <div className="text-right">
                                                {couponDiscount && (
                                                    <span className="text-slate-500 line-through text-sm mr-2">{basePrice.toLocaleString()}원</span>
                                                )}
                                                <span className="text-2xl font-black text-white">{finalPrice.toLocaleString()}원</span>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full py-5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-600/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="animate-spin" size={20} />
                                                        처리 중...
                                                    </>
                                                ) : (
                                                    '결제 요청하기'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}

                            {step === 'success' && (
                                <div className="text-center py-6">
                                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 size={40} className="text-emerald-500" />
                                    </div>
                                    <h2 className="text-3xl font-black text-white mb-4">청구서 발송 완료!</h2>
                                    <p className="text-slate-400 mb-8 leading-relaxed">
                                        입력하신 번호로 <strong>카카오톡 결제 청구서</strong>가 발송되었습니다.<br />
                                        청구서에서 결제를 완료하시면 라이선스가 발급됩니다.
                                    </p>

                                    <div className="p-4 bg-slate-800 rounded-2xl mb-8">
                                        <p className="text-xs text-slate-500 mb-2 font-black uppercase tracking-widest">직접 결제 링크</p>
                                        <a
                                            href={shortUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-orange-500 font-bold break-all hover:underline"
                                        >
                                            {shortUrl}
                                        </a>
                                    </div>

                                    <button
                                        onClick={onClose}
                                        className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-colors"
                                    >
                                        닫기
                                    </button>
                                </div>
                            )}

                            {step === 'error' && (
                                <div className="text-center py-6">
                                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <AlertCircle size={40} className="text-red-500" />
                                    </div>
                                    <h2 className="text-3xl font-black text-white mb-4">문제가 발생했습니다</h2>
                                    <p className="text-slate-400 mb-10 leading-relaxed">
                                        {errorMessage}
                                    </p>
                                    <button
                                        onClick={() => setStep('info')}
                                        className="w-full py-5 bg-slate-800 text-white rounded-2xl font-black text-lg hover:bg-slate-700 transition-colors"
                                    >
                                        다시 시도하기
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;
