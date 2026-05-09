import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle, ChevronRight, MessageCircle, Sparkles, TrendingUp, Users, Presentation, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

const CONSULTATION_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSfo7-SGmbWyqL4-v30AwtJnBJdwiGvx3Fkw-QsnM-IQU8hABQ/viewform?usp=dialog";

function PrimaryCTAButton({ className, children, subtitle }: { className?: string, children: React.ReactNode, subtitle?: string }) {
  return (
    <div className="flex flex-col items-center group">
      <a 
        href={CONSULTATION_LINK} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`relative overflow-hidden group bg-electric text-white font-bold py-4 px-8 rounded-full flex items-center gap-2 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] ${className}`}
      >
        <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out" />
        <span className="relative flex items-center">{children}</span>
      </a>
      {subtitle && <span className="text-xs text-slate mt-3 tracking-wide font-medium">{subtitle}</span>}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-electric/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[150px]" 
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full glass-panel text-electric text-sm font-semibold tracking-wider mb-6">
            INNOVATION AI MARKETING
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-snow text-balance">
            사장님의 20년 경험, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-fuchsia-400">
              AI가 3초 만에 <br/> 브랜드로 만듭니다.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate mb-10 max-w-2xl mx-auto font-light text-balance leading-relaxed">
            막연한 감에 의존하는 시대는 끝났습니다. 데이터 기반의 압도적인 AI 분석으로 귀하의 비즈니스를 독보적인 브랜드로 진화시킵니다.
          </p>
          <PrimaryCTAButton className="text-lg" subtitle="전문가가 1분 내로 확인합니다">
            지금 바로 맞춤 상담 신청하기 <ArrowRight className="w-5 h-5 ml-1" />
          </PrimaryCTAButton>
        </motion.div>
      </div>
    </section>
  );
}

const SYNC_TEXTS: Record<string, { slogan: string, story: string }> = {
  "카페/베이커리": {
    slogan: "완벽한 휴식의 온도, 당신을 기다립니다.",
    story: "매일 아침 갓 구운 빵 냄새와 섬세하게 블렌딩된 원듀의 향연. 바쁜 일상 속, 오롯이 나만을 위한 프리미엄 휴식 공간을 선사합니다."
  },
  "미용/뷰티": {
    slogan: "당신의 숨겨진 아름다움을 디자인하다.",
    story: "퍼스널 컬러와 얼굴형을 분석하는 AI 진단 시스템을 통해, 고객 한 분 한 분의 고유한 매력을 극대화하는 맞춤형 뷰티 솔루션을 제공합니다."
  },
  "학원/교육": {
    slogan: "압도적인 결과로 증명하는 1%의 차이.",
    story: "개인별 학습 데이터를 분석하여 최적의 커리큘럼을 설계합니다. 단순한 지식 전달을 넘어, 스스로 학습하는 힘을 길러주는 미래 교육의 표준."
  },
  "1인 기업/전문직": {
    slogan: "당신의 전문성, 이제 대체 불가능한 브랜드가 되다.",
    story: "수년간 쌓아온 노하우와 전문 지식을 시장이 열광하는 셀링 포인트로 변환합니다. 당신이라는 이름 자체가 가장 강력한 마케팅 무기가 됩니다."
  }
};

function TypewriterEffect({ text, onComplete }: { text: string, onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <span>{displayedText}</span>;
}

function AiSimulator() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ slogan: string, story: string } | null>(null);

  const handleSelect = (industry: string) => {
    if (selectedIndustry === industry) return;
    setSelectedIndustry(industry);
    setIsGenerating(true);
    setResult(null);
    
    // Simulate API delay
    setTimeout(() => {
      setIsGenerating(false);
      setResult(SYNC_TEXTS[industry]);
    }, 1500);
  };

  return (
    <section className="py-24 px-6 relative" id="simulator">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">AI 브랜드 기획 시뮬레이터</h2>
          <p className="text-slate text-lg">업종을 선택하고 AI의 기획력을 직접 확인해보세요.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6 flex items-center text-snow">
              <Zap className="w-5 h-5 text-electric mr-2" /> 업종 선택
            </h3>
            {Object.keys(SYNC_TEXTS).map((industry) => (
              <button
                key={industry}
                onClick={() => handleSelect(industry)}
                className={`w-full text-left px-6 py-4 rounded-xl glass-panel transition-all duration-300 flex items-center justify-between group ${
                  selectedIndustry === industry ? 'border-electric bg-electric/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'hover:bg-white/10'
                }`}
              >
                <span className="font-medium text-lg">{industry}</span>
                <ChevronRight className={`w-5 h-5 transition-transform ${selectedIndustry === industry ? 'text-electric rotate-90' : 'text-slate group-hover:translate-x-1'}`} />
              </button>
            ))}
          </div>

          <div className="glass-panel rounded-2xl p-8 min-h-[400px] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric to-transparent opacity-50" />
            
            <h3 className="text-xl font-semibold mb-8 flex items-center text-snow">
              <Sparkles className="w-5 h-5 text-electric mr-2" /> AI 기획 결과
            </h3>

            {!selectedIndustry && !isGenerating && !result && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate">
                <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                <p>좌측에서 업종을 선택하시면<br/>AI가 즉시 브랜딩을 시작합니다.</p>
              </div>
            )}

            {isGenerating && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 relative">
                  <div className="absolute inset-0 border-t-2 border-electric rounded-full animate-spin"></div>
                  <div className="absolute inset-2 border-r-2 border-fuchsia-400 rounded-full animate-spin direction-reverse"></div>
                </div>
                <motion.p 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-electric font-medium tracking-widest"
                >
                  AI 브랜드 기획 중...
                </motion.p>
              </div>
            )}

            {result && !isGenerating && (
              <div className="flex-1 space-y-8">
                <div>
                  <h4 className="text-sm text-slate uppercase tracking-wider mb-2 font-semibold">Brand Slogan</h4>
                  <p className="text-2xl font-bold text-snow leading-tight">
                    <TypewriterEffect text={`"${result.slogan}"`} />
                  </p>
                </div>
                <div>
                  <h4 className="text-sm text-slate uppercase tracking-wider mb-2 font-semibold">Brand Story</h4>
                  <p className="text-lg text-slate/90 leading-relaxed font-light">
                    <TypewriterEffect text={result.story} />
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const PORTFOLIO_DATA = [
  {
    title: "A 로스터리 카페",
    industry: "카페/베이커리",
    metric: "매출 215% 상승",
    desc: "AI 상권 분석을 통한 타겟팅 재설정으로 오픈 3개월 만에 지역 내 매출 1위 달성.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "B 프라이빗 살롱",
    industry: "미용/뷰티",
    metric: "신규 예약 300% 증가",
    desc: "시각적 AI 콘텐츠 생성으로 인스타그램 도달률 극대화 및 고가의 멤버십 전환 성공.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "C 프리미어 학원",
    industry: "학원/교육",
    metric: "원생 모집 조기 마감",
    desc: "학부모의 페인포인트를 자극하는 AI 카피라이팅 적용 후, 설명회 참석률 4배 증가.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  }
];

function Portfolio() {
  return (
    <section className="py-24 px-6 bg-charcoal relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">압도적인 성공 사례</h2>
            <p className="text-slate text-lg">숫자가 증명하는 AI 마케팅의 파괴력.</p>
          </div>
          <PrimaryCTAButton className="py-3 px-8 text-sm">
            내 업종 맞춤 전략 받기
          </PrimaryCTAButton>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="group relative rounded-2xl overflow-hidden glass-panel aspect-[4/5] cursor-pointer"
            >
              <div className="absolute inset-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent" />
              </div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-electric text-sm font-bold tracking-wider mb-2 uppercase">{item.industry}</span>
                <h3 className="text-2xl font-bold text-snow mb-4">{item.title}</h3>
                <p className="text-slate text-sm line-clamp-2 md:line-clamp-none transition-all duration-300 opacity-80 group-hover:opacity-100">{item.desc}</p>
                
                {/* Hover Metric Reveal */}
                <div className="mt-6 overflow-hidden">
                  <div className="flex items-center text-electric font-bold text-xl translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <TrendingUp className="w-6 h-6 mr-2" />
                    {item.metric}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UpsellBanner() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-electric/20 to-fuchsia-600/10 border border-electric/20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-electric/30 blur-[80px] rounded-full"></div>
        <div className="relative z-10 flex-1">
          <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-snow mb-4">기간 한정 혜택</span>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">대행사 없이도 가능한<br/>'수익형 AI 프롬프트 가이드'</h2>
          <p className="text-slate mb-0 max-w-md line-relaxed">실제 업무에 즉시 적용 가능한 50가지 시크릿 프롬프트 전자책을 지금 바로 확인하세요.</p>
        </div>
        <div className="relative z-10 w-full md:w-auto">
          <a href="#" className="block w-full text-center bg-white text-charcoal font-bold py-4 px-8 rounded-full hover:bg-snow transition-colors shadow-lg">
            전자책 구매하기
          </a>
        </div>
      </div>
    </section>
  );
}

function ConsultationSection() {
  return (
    <section className="py-24 px-6 relative" id="consultation">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-electric/20 rounded-full blur-[100px]" />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="glass-panel p-10 md:p-16 rounded-[3rem] text-center border-electric/30 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-electric/0 via-electric/10 to-electric/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          <div className="w-20 h-20 mx-auto bg-electric/10 rounded-full flex items-center justify-center mb-8 border border-electric/30">
            <Sparkles className="w-10 h-10 text-electric drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-snow text-balance">
            비즈니스의 판도를 바꿀 준비가 되셨나요?
          </h2>
          <p className="text-lg md:text-xl text-slate/90 mb-10 max-w-2xl mx-auto font-light text-balance leading-relaxed">
            더 이상 고민하지 마세요. 혁신적인 AI 분석과 전문가의 인사이트로 당신의 브랜드에 가장 확실한 성장 공식을 제시합니다.
          </p>
          
          <a 
            href={CONSULTATION_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center relative overflow-hidden bg-electric text-white font-bold text-lg md:text-xl py-5 px-10 md:px-14 rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] mx-auto"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full hover:translate-x-full transition-transform duration-500 ease-out" />
            <span className="relative flex items-center gap-3">
              맞춤 상담 신청하기 <ArrowRight className="w-6 h-6" />
            </span>
          </a>
          <p className="mt-6 text-sm text-slate font-medium">안내에 따라 폼을 작성해 주시면, 전문가가 신속하게 연락드립니다.</p>
        </div>
      </div>
    </section>
  );
}

function GlobalNav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-x-0 border-t-0 border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center transition-all">
      <div className="font-bold text-xl tracking-tighter text-snow flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-gradient-to-br from-electric to-fuchsia-500 flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
        혁신 AI
      </div>
      <div className="hidden md:flex items-center gap-8 justify-end flex-1">
        <div className="flex items-center gap-6 text-sm font-medium text-slate mr-4">
          <a href="#simulator" className="hover:text-snow transition-colors">AI 시뮬레이터</a>
          <a href="#portfolio" className="hover:text-snow transition-colors">성공 사례</a>
        </div>
        <a 
          href={CONSULTATION_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 hover:bg-white/20 border border-white/20 text-snow text-sm font-bold py-2.5 px-6 rounded-full transition-all flex items-center gap-2 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:border-electric/50"
        >
          맞춤 상담 바로가기 <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </nav>
  );
}

function MobileStickyCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full p-4 z-50 bg-gradient-to-t from-charcoal via-charcoal/90 to-transparent pb-6">
      <a 
        href={CONSULTATION_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-electric text-white text-center font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.5)] active:scale-95 transition-transform"
      >
        맞춤 상담 신청하기 <ArrowRight className="w-5 h-5" />
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 text-center text-slate text-sm">
      <p className="mb-4">Innovation AI Marketing © 2026. All rights reserved.</p>
      <p className="opacity-60 text-xs text-balance max-w-xl mx-auto leading-relaxed">
        본 사이트는 AI가 생성한 가상의 포트폴리오를 포함하고 있으며, 실제 상담은 전문 담당자를 통해 이루어집니다.<br/>
        문의: info@nextin.ai.kr
      </p>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-charcoal min-h-screen text-snow font-sans">
      <GlobalNav />
      <Hero />
      <AiSimulator />
      <div id="portfolio">
        <Portfolio />
      </div>
      <UpsellBanner />
      <ConsultationSection />
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
