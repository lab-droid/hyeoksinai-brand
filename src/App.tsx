import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle, ChevronRight, MessageCircle, Sparkles, TrendingUp, Users, Presentation, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

const KAKAO_LINK = "#kakao-link-placeholder";

function KakaoButton({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center group">
      <a 
        href={KAKAO_LINK} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`relative overflow-hidden group bg-electric text-white font-semibold py-4 px-8 rounded-full flex items-center gap-2 hover:scale-[1.02] transition-transform duration-300 ${className}`}
      >
        <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out" />
        {children}
      </a>
      <span className="text-xs text-slate mt-2 tracking-wide font-medium">전문가가 1분 내로 확인합니다</span>
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
          <KakaoButton className="text-lg">
            지금 바로 AI 무료 진단받기 <ArrowRight className="w-5 h-5 ml-1" />
          </KakaoButton>
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
          <KakaoButton className="py-3 px-6 text-sm">
            내 업종 성공전략 묻기
          </KakaoButton>
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

const FORM_STEPS = [
  { id: 'name', label: '성함', type: 'text', placeholder: '홍길동' },
  { id: 'phone', label: '연락처', type: 'tel', placeholder: '010-0000-0000' },
  { id: 'industry', label: '업종', type: 'text', placeholder: '예: 요식업, IT, 교육' },
  { id: 'revenue', label: '월 평균 매출', type: 'text', placeholder: '예: 1,000만원' },
  { id: 'painpoint', label: '현재 가장 큰 고민', type: 'textarea', placeholder: '최근 신규 고객 유입이 줄어들어 고민입니다.' }
];

function LeadGenForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('ai_agency_form');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.currentStep !== undefined && parsed.formData) {
          if (!parsed.isCompleted) {
             setFormData(parsed.formData);
             setCurrentStep(Math.min(parsed.currentStep, FORM_STEPS.length - 1));
          }
        }
      } catch (e) {}
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('ai_agency_form', JSON.stringify({ currentStep, formData, isCompleted }));
  }, [currentStep, formData, isCompleted]);

  const handleNext = () => {
    const step = FORM_STEPS[currentStep];
    const value = formData[step.id] || "";
    
    if (!value.trim()) {
      setError("필수 항목입니다.");
      return;
    }
    
    if (step.id === 'phone' && !/^[0-9-]{9,13}$/.test(value)) {
       setError("올바른 연락처 형식이 아닙니다.");
       return;
    }

    setError("");
    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsCompleted(true);
    }, 2500);
  };

  const currentStepData = FORM_STEPS[currentStep];

  return (
    <section className="py-24 px-6 relative" id="diagnosis">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">단 1분, 무료 진단 신청</h2>
          <p className="text-slate text-lg">AI가 귀하의 비즈니스 구조를 분석합니다.</p>
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
          {/* Progress Bar overall */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
            <div 
              className="h-full bg-electric transition-all duration-500 ease-out"
              style={{ width: isCompleted ? '100%' : `${(currentStep / FORM_STEPS.length) * 100}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            {!isGenerating && !isCompleted && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="mb-8">
                  <span className="text-electric font-mono text-sm mb-2 block">STEP 0{currentStep + 1}</span>
                  <h3 className="text-2xl font-bold">{currentStepData.label}을(를) 입력해주세요.</h3>
                </div>

                <motion.div 
                  className="mb-8 relative"
                  animate={error ? { x: [-6, 6, -6, 6, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  {currentStepData.type === 'textarea' ? (
                     <textarea
                       autoFocus
                       className={`w-full bg-charcoal/50 border ${error ? 'border-electric' : 'border-white/10'} rounded-xl px-4 py-4 text-snow focus:outline-none focus:border-electric transition-colors min-h-[120px] resize-none`}
                       placeholder={currentStepData.placeholder}
                       value={formData[currentStepData.id] || ""}
                       onChange={(e) => {
                         setFormData(prev => ({ ...prev, [currentStepData.id]: e.target.value }));
                         setError("");
                       }}
                       onKeyDown={(e) => {
                         if (e.key === 'Enter' && e.metaKey) handleNext();
                       }}
                     />
                  ) : (
                    <input
                      autoFocus
                      type={currentStepData.type}
                      className={`w-full bg-charcoal/50 border ${error ? 'border-electric' : 'border-white/10'} rounded-xl px-4 py-4 text-snow focus:outline-none focus:border-electric transition-colors text-lg`}
                      placeholder={currentStepData.placeholder}
                      value={formData[currentStepData.id] || ""}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, [currentStepData.id]: e.target.value }));
                        setError("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleNext();
                      }}
                    />
                  )}
                  {error && (
                    <motion.div 
                      key={error}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-7 left-0 text-electric text-sm flex items-center font-medium"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" /> {error}
                    </motion.div>
                  )}
                </motion.div>

                <div className="flex justify-between items-center mt-auto">
                  <button
                    onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                    className={`text-slate hover:text-snow transition-colors px-4 py-2 ${currentStep === 0 ? 'invisible' : ''}`}
                  >
                    이전으로
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-snow text-charcoal font-bold py-3 px-8 rounded-full hover:bg-white transition-colors flex items-center"
                  >
                    {currentStep === FORM_STEPS.length - 1 ? '결과 확인하기' : '다음으로'} <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {isGenerating && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-full max-w-sm h-2 bg-charcoal rounded-full overflow-hidden mb-4">
                   <motion.div 
                     className="h-full bg-gradient-to-r from-electric to-fuchsia-400"
                     initial={{ width: "0%" }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 2.5, ease: "linear" }}
                   />
                </div>
                <h3 className="text-2xl font-bold text-snow">진단 보고서 생성 중...</h3>
                <p className="text-slate">AI가 최고의 스케일업 전략을 도출하고 있습니다.</p>
              </motion.div>
            )}

            {isCompleted && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 flex flex-col items-center text-center stretch"
              >
                <div className="w-20 h-20 rounded-full bg-electric/20 flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-electric" />
                </div>
                <h3 className="text-3xl font-bold mb-4">진단이 완료되었습니다.</h3>
                <div className="bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 px-6 py-3 rounded-lg font-semibold mb-8 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  한정 수량! 이번 달 무료 진단은 단 2석 남았습니다.
                </div>
                <p className="text-slate mb-8 max-w-md mx-auto">
                  {formData['name']} 대표님을 위한 1:1 맞춤형 마케팅 전략이 준비되었습니다. 담당자가 곧 카카오톡으로 보고서를 발송해드립니다.
                </p>
                <KakaoButton>
                  카카오톡으로 즉시 받아보기
                </KakaoButton>
                <button 
                  onClick={() => {
                    setIsCompleted(false);
                    setCurrentStep(0);
                    setFormData({});
                    localStorage.removeItem('ai_agency_form');
                  }}
                  className="mt-6 text-sm text-slate underline hover:text-snow"
                >
                  새로 입력하기
                </button>
              </motion.div>
            )}
          </AnimatePresence>
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
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate">
        <a href="#simulator" className="hover:text-snow transition-colors">AI 시뮬레이터</a>
        <a href="#portfolio" className="hover:text-snow transition-colors">성공 사례</a>
        <a href="#diagnosis" className="hover:text-snow transition-colors">무료 진단</a>
      </div>
    </nav>
  );
}

function MobileStickyCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full p-4 z-50 bg-gradient-to-t from-charcoal via-charcoal/90 to-transparent pb-6">
      <a 
        href="#diagnosis" 
        className="block w-full bg-electric text-white text-center font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)]"
      >
        지금 무료 진단받기
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
      <LeadGenForm />
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
