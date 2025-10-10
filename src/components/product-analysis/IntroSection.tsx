const IntroSection = () => {
  return (
    <section className="pt-[60px] pb-[40px] md:pt-20 md:pb-10" style={{ backgroundColor: '#003DA5' }}>
      <div className="mx-auto text-center">
        <p className="text-[#F2F2F2] font-medium text-[20px] mb-5">
          현재 급여 제품 분석
        </p>

        <h2 className="mb-7 text-[#FFFFFF] font-semibold text-[25px] md:text-[45px]">
          내가 먹이는 이 사료,<br />정말 믿고 먹일 수 있을까요?
        </h2>

        <p className="text-[#F8F8F8] font-medium text-[15px] md:text-[28px] mx-auto">
          서울대·한국수의영양학회 임원 수의사와 함께<br className="md:hidden" /> 설계한 AI가 30초 만에 분석해드려요!
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
