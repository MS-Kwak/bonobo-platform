'use client';

import { motion } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: ease as unknown as [number, number, number, number],
    },
  }),
};

export function AboutHero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg01.png')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 text-center lg:px-8 lg:pt-40 lg:pb-28">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mb-5 font-heading text-sm font-bold tracking-widest text-white/50 uppercase"
        >
          About Us
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight"
        >
          기술과 함께 성장하는
          <br />
          소프트웨어 전문 기업
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
        >
          1999년부터 고객의 비즈니스를 깊이 이해하고,
          <br className="hidden sm:block" />
          함께 성장해온 보노보플랫폼을 소개합니다.
        </motion.p>
      </div>
    </section>
  );
}
