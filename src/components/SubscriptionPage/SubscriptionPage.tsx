import React, { useState } from "react";
import { Check, Crown, Zap, Shield, Star, Sparkles } from "lucide-react";
import GooglePayButton from "@google-pay/button-react";
import { useParams, Link } from "react-router-dom";

export const SubscriptionPage: React.FC = () => {
  const { levelId } = useParams();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "yearly",
  );
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const prices = {
    monthly: {
      amount: "10.00",
      label: "Monthly",
      description: "Perfect for getting started",
    },
    yearly: {
      amount: "100.00",
      label: "Yearly",
      description: "Best value for long-term mastery",
    },
  };

  const currentPlan = prices[billingCycle];

  const features = [
    "Unlock all A1 & A2 lessons",
    "Interactive pronunciation guide",
    "Advanced grammar worksheets",
    "Daily practice widgets",
    "Personal progress tracking",
    "Certificate of completion",
  ];

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen bg-[#0f172a] rounded-[20px] text-white flex items-center justify-center p-6">
        <div className="max-w-sm w-full bg-[#1e293b] border border-white/10 rounded-2xl p-8 text-center shadow-2xl relative z-10">
          <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center mb-6">
            <Check size={32} className="text-white" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Payment Successful</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Welcome to Premium! You now have full access to all professional
            English learning tools.
          </p>

          <div className="space-y-4">
            <Link
              to={`/${levelId}/home`}
              className="block w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 text-center"
            >
              Start Learning Now
            </Link>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
              Your account is now active
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === "error") {
    return (
      <div className="min-h-screen bg-[#0f172a] rounded-[20px] text-white flex items-center justify-center p-6">
        <div className="max-w-sm w-full bg-[#1e293b] border border-red-500/20 rounded-2xl p-8 text-center shadow-2xl relative z-10">
          <div className="w-16 h-16 bg-red-500/10 rounded-full mx-auto flex items-center justify-center mb-6">
            <Shield className="text-red-400" size={32} />
          </div>

          <h2 className="text-2xl font-bold mb-2 text-red-400">
            Payment Failed
          </h2>
          <p className="text-gray-400 mb-8">
            We couldn't process your payment. Please try again.
          </p>

          <button
            onClick={() => setPaymentStatus("idle")}
            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-all cursor-pointer"
          >
            Try Again
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Need help? Contact{" "}
            <a
              href="mailto:abdomohamed2200066@gmail.com"
              className="text-blue-400 underline"
            >
              support
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] rounded-[20px] text-white py-20 px-6 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium animate-pulse">
            <Sparkles size={16} />
            <span>Limited Time Offer</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Upgrade to Premium
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Get full access to all features and accelerate your English journey
            with professional tools.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center mt-10">
            <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex items-center gap-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all relative ${
                  billingCycle === "yearly"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Yearly
                <span className="absolute -top-3 -right-3 bg-green-500 text-[10px] text-white px-2 py-0.5 rounded-full font-bold">
                  BEST VALUE
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Main Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-blue-500/30 transition-all duration-500 group">
            <div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {currentPlan.label} Plan
                  </h3>
                  <p className="text-gray-400">{currentPlan.description}</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 group-hover:scale-110 transition-transform">
                  {billingCycle === "monthly" ? (
                    <Zap className="text-blue-400" />
                  ) : (
                    <Crown className="text-yellow-400" />
                  )}
                </div>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-bold">{currentPlan.amount}</span>
                <span className="text-2xl font-bold ml-1 text-blue-400">
                  EGP
                </span>
                <span className="text-gray-400 ml-2">
                  /{billingCycle === "monthly" ? "mo" : "yr"}
                </span>
              </div>

              <div className="space-y-4 mb-10">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="bg-green-500/20 p-1 rounded-full">
                      <Check size={14} className="text-green-400" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-full h-16 overflow-hidden rounded-3xl flex justify-center">
                <GooglePayButton
                  environment="TEST"
                  buttonColor="white"
                  buttonType="subscribe"
                  buttonSizeMode="fill"
                  buttonRadius={24}
                  paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                      {
                        type: "CARD",
                        parameters: {
                          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                          allowedCardNetworks: [
                            "AMEX",
                            "DISCOVER",
                            "INTERAC",
                            "JCB",
                            "MASTERCARD",
                            "VISA",
                          ],
                        },
                        tokenizationSpecification: {
                          type: "PAYMENT_GATEWAY",
                          parameters: {
                            gateway: "example",
                            gatewayMerchantId: "exampleGatewayMerchantId",
                          },
                        },
                      },
                    ],
                    merchantInfo: {
                      merchantId: "BCR2DN5T43H2NESC",
                      merchantName: "Abdelrahman English",
                    },
                    transactionInfo: {
                      totalPriceStatus: "FINAL",
                      totalPriceLabel: "Total",
                      totalPrice: currentPlan.amount,
                      currencyCode: "EGP",
                      countryCode: "EG",
                    },
                  }}
                  onLoadPaymentData={(paymentData) => {
                    console.log("Payment Success", paymentData);
                    setPaymentStatus("success");
                  }}
                  onError={(error) => {
                    console.error("Payment Error", error);
                    setPaymentStatus("error");
                  }}
                />
              </div>
              <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                Secure payment with Google Pay
              </p>
            </div>
          </div>

          {/* Features Detail Card */}
          <div className="hidden md:flex flex-col gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center gap-5 hover:bg-white/10 transition-all cursor-default">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl border border-purple-500/20 flex items-center justify-center">
                <Shield className="text-purple-400" />
              </div>
              <div>
                <h4 className="font-bold">Safe & Secure</h4>
                <p className="text-sm text-gray-400">
                  Encrypted payments and data protection.
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center gap-5 hover:bg-white/10 transition-all cursor-default">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl border border-blue-500/20 flex items-center justify-center">
                <Star className="text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold">Expert Content</h4>
                <p className="text-sm text-gray-400">
                  Curated lessons from professional linguists.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Crown size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Master English Today</h3>
              <p className="text-gray-400 mb-6">
                Join over 5,000+ students learning on our platform.
              </p>
              <div className="flex -space-x-3 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[#0f172a] bg-gray-700 flex items-center justify-center text-[10px] font-bold"
                  >
                    U{i}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-[#0f172a] bg-blue-600 flex items-center justify-center text-[10px] font-bold">
                  +5k
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ/Trust Section */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm">
            Questions? Contact our support at{" "}
            <a
              href="mailto:abdomohamed2200066@gmail.com"
              className="text-blue-400 underline hover:text-blue-300 transition-colors"
            >
              abdomohamed2200066@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
