"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, HelpCircle, MessageCircle, Book, Shield } from "lucide-react";

export default function HelpPage() {
  const router = useRouter();

  const helpSections = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn how to deposit and manage your savings",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Keep your wallet and private keys safe",
    },
    {
      icon: MessageCircle,
      title: "Support",
      description: "Get help from our community",
    },
  ];

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
        <button
          onClick={() => router.push('/dashboard')}
          className="p-2.5 hover:bg-gray-100 rounded-2xl transition-all duration-300 active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-black text-black tracking-tight">Help</h1>
        <div className="w-10" />
      </header>

      <div className="flex-1 px-6 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
          <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <div className="text-center max-w-md">
            <h2 className="text-3xl font-black text-black mb-4">How can we help?</h2>
            <p className="text-gray-600 font-medium">
              Browse our help sections or contact support for assistance
            </p>
          </div>

          <div className="w-full max-w-md space-y-4">
            {helpSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <button
                  key={index}
                  className="w-full p-5 bg-white border-2 border-gray-200 rounded-2xl flex items-center gap-4 hover:border-black hover:shadow-lg transition-all duration-300 active:scale-95 text-left"
                >
                  <div className="w-12 h-12 bg-gray-50 border-2 border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-black mb-1">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {section.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
