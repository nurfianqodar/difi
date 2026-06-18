import React, { useEffect, useMemo, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FaBirthdayCake, FaGift, FaHeart, FaStar } from "react-icons/fa";
import { GiBalloons, GiPartyPopper } from "react-icons/gi";

/* ------------------------------------------------------------------ */
/*  Data — easy to edit                                               */
/* ------------------------------------------------------------------ */

const WISHES: { title: string; text: string; icon: IconType }[] = [
    {
        title: "Sehat & Bahagia",
        text:
            "Semoga di umur 22 ini, kamu makin sehat, makin bahagia, dan makin dikasih ketenangan dalam menjalani hari-hari.",
        icon: FaHeart,
    },
    {
        title: "Mimpi yang Terwujud",
        text:
            "Semua mimpi dan rencana yang kamu susun diam-diam, semoga pelan-pelan jadi kenyataan satu per satu.",
        icon: FaStar,
    },
    {
        title: "Dikelilingi Orang Baik",
        text:
            "Semoga selalu dikelilingi orang-orang yang tulus sayang sama kamu, persis kayak kamu sayang ke mereka.",
        icon: GiBalloons,
    },
    {
        title: "Versi Terbaik Dirimu",
        text:
            "Semoga tahun ini jadi tahun di mana kamu makin kenal & makin sayang sama diri sendiri.",
        icon: FaGift,
    },
];

const TIMELINE = [
    { age: "Dulu", note: "Awal cerita yang penuh keceriaan." },
    { age: "Kemarin", note: "Banyak cerita, banyak tumbuh, banyak belajar." },
    { age: "Hari ini", note: "22 tahun — tepat di titik ini, merayakan kamu." },
    { age: "Nanti", note: "Babak baru, penuh harapan baik." },
];

/* ------------------------------------------------------------------ */
/*  Confetti piece                                                     */
/* ------------------------------------------------------------------ */

const CONFETTI_COLORS = [
    "#f9a8d4",
    "#c084fc",
    "#f472b6",
    "#a78bfa",
    "#fbcfe8",
    "#ddd6fe",
];

function ConfettiBurst({ active }: { active: boolean }) {
    const pieces = useMemo(
        () =>
            Array.from({ length: 60 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 0.6,
                duration: 2.2 + Math.random() * 1.6,
                color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                size: 6 + Math.random() * 8,
                rotate: Math.random() * 360,
                drift: (Math.random() - 0.5) * 200,
            })),
        [active],
    );

    if (!active) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-60 overflow-hidden">
            {pieces.map((p) => (
                <span
                    key={p.id}
                    className="confetti-piece absolute top-[-5%] rounded-sm"
                    style={{
                        left: `${p.left}%`,
                        width: p.size,
                        height: p.size * 1.4,
                        backgroundColor: p.color,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        "--drift": `${p.drift}px`,
                        "--rotate": `${p.rotate}deg`,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Floating ambient shapes (balloons / sparkles in background)        */
/* ------------------------------------------------------------------ */

function AmbientField() {
    const items = useMemo(
        () =>
            Array.from({ length: 10 }, (_, i) => ({
                id: i,
                left: 4 + Math.random() * 92,
                size: 18 + Math.random() * 28,
                duration: 14 + Math.random() * 10,
                delay: Math.random() * 8,
                opacity: 0.12 + Math.random() * 0.18,
            })),
        [],
    );

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {items.map((it) => (
                <FaHeart
                    key={it.id}
                    className="ambient-float absolute text-fuchsia-300"
                    style={{
                        left: `${it.left}%`,
                        bottom: "-10%",
                        fontSize: it.size,
                        opacity: it.opacity,
                        animationDuration: `${it.duration}s`,
                        animationDelay: `${it.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Gift envelope — the signature interactive element                  */
/* ------------------------------------------------------------------ */

function GiftEnvelope(
    { opened, onOpen }: {
        opened: boolean;
        onOpen: React.MouseEventHandler<HTMLButtonElement>;
    },
) {
    return (
        <button
            onClick={onOpen}
            aria-label={opened ? "Kado sudah dibuka" : "Buka kado ucapan"}
            className="group relative mx-auto block focus:outline-none"
        >
            <div
                className={`envelope-card relative h-56 w-72 sm:h-64 sm:w-80 rounded-2xl border-2 border-fuchsia-300/60 bg-linear-to-br from-pink-200 via-fuchsia-100 to-violet-200 shadow-xl transition-transform duration-500 ${opened ? "scale-[1.02]" : "group-hover:-translate-y-1"
                    }`}
                style={{
                    boxShadow: "0 18px 40px -12px rgba(168, 85, 247, 0.45)",
                }}
            >
                {/* envelope flap */}
                <div
                    className={`absolute left-0 top-0 h-1/2 w-full origin-top rounded-t-2xl bg-linear-to-br from-fuchsia-400 to-violet-400 transition-transform duration-700 ease-out transform-3d ${opened ? "rotate-x-[-160deg]" : ""
                        }`}
                    style={{ clipPath: "polygon(0 0, 100% 0, 50% 78%)" }}
                />

                {/* seal / ribbon */}
                {!opened && (
                    <div className="absolute left-1/2 top-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg ring-4 ring-pink-100 transition-transform group-hover:scale-110">
                        <FaGift size={22} />
                    </div>
                )}

                {/* content revealed */}
                <div
                    className={`absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center transition-opacity duration-500 ${opened ? "opacity-100 delay-300" : "opacity-0"
                        }`}
                >
                    <FaBirthdayCake className="text-violet-600" size={30} />
                    <p className="font-indie text-2xl text-violet-800">
                        Untuk Pudan tersayang,
                    </p>
                    <p className="text-sm text-violet-700/80">
                        ketuk sekali lagi untuk membaca pesan lengkapnya di
                        bawah ✨
                    </p>
                </div>

                {!opened && (
                    <p className="font-indie absolute bottom-5 left-1/2 -translate-x-1/2 text-lg text-violet-700">
                        ketuk untuk membuka kado
                    </p>
                )}
            </div>
        </button>
    );
}

/* ------------------------------------------------------------------ */
/*  Wish card                                                          */
/* ------------------------------------------------------------------ */

function WishCard(
    { wish, index }: {
        wish: { icon: IconType; title: string; text: string };
        index: number;
    },
) {
    const Icon = wish.icon;

    return (
        <div
            className="wish-card group relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-6 shadow-md shadow-fuchsia-200/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-fuchsia-300/50"
            style={{ animationDelay: `${index * 120}ms` }}
        >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-linear-to-br from-pink-300/40 to-violet-300/40 blur-xl transition-transform duration-500 group-hover:scale-125" />
            <div className="relative z-10 mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-fuchsia-500 to-violet-500 text-white shadow-md">
                <Icon size={18} />
            </div>
            <h3 className="relative z-10 mb-1.5 font-indie text-2xl text-violet-900">
                {wish.title}
            </h3>
            <p className="relative z-10 text-sm leading-relaxed text-violet-700/90">
                {wish.text}
            </p>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export const Bd22Nd: React.FC = () => {
    const [opened, setOpened] = useState(false);
    const [confetti, setConfetti] = useState(false);
    const [candlesLit, setCandlesLit] = useState([true, true, true]);
    const sectionRef = useRef<HTMLDivElement>(null);

    const handleOpen = () => {
        if (!opened) {
            setOpened(true);
            setConfetti(true);
            setTimeout(() => setConfetti(false), 3200);
        } else {
            sectionRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const allCandlesOut = candlesLit.every((c) => !c);

    useEffect(() => {
        if (allCandlesOut) {
            setConfetti(true);
            const t = setTimeout(() => setConfetti(false), 3200);
            return () => clearTimeout(t);
        }
    }, [allCandlesOut]);

    const blowCandle = (i: number) => {
        setCandlesLit((prev) => prev.map((c, idx) => (idx === i ? false : c)));
    };

    const relightCandles = () => setCandlesLit([true, true, true]);

    return (
        <main className="font-indie relative min-h-screen overflow-x-hidden bg-linear-to-b from-pink-50 via-fuchsia-50 to-violet-100 text-violet-950">
            <ConfettiBurst active={confetti} />

            {/* ---------------- HERO ---------------- */}
            <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-20 text-center">
                <AmbientField />

                <div className="relative z-10 flex flex-col items-center">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/70 bg-white/60 px-4 py-1.5 text-sm font-sans tracking-wide text-fuchsia-700 shadow-sm backdrop-blur-sm">
                        <GiPartyPopper className="text-fuchsia-500" />
                        22 tahun, hari yang spesial
                    </span>

                    <h1 className="font-indie text-5xl leading-tight text-violet-900 drop-shadow-sm sm:text-6xl md:text-7xl">
                        Happy 22nd Birthday
                    </h1>
                    <p className="font-indie mt-1 text-6xl text-fuchsia-600 sm:text-7xl md:text-8xl">
                        Pudan
                    </p>

                    <p className="mt-6 max-w-md font-sans text-base text-violet-700/80 sm:text-lg">
                        Satu kado kecil menantimu di bawah ini. Buka
                        pelan-pelan, ya 🎁
                    </p>

                    <div className="mt-10">
                        <GiftEnvelope opened={opened} onOpen={handleOpen} />
                    </div>

                    <button
                        onClick={() =>
                            sectionRef.current?.scrollIntoView({
                                behavior: "smooth",
                            })}
                        className="mt-10 font-sans text-sm text-violet-500 underline-offset-4 transition hover:text-violet-700 hover:underline"
                    >
                        scroll untuk lanjut membaca ↓
                    </button>
                </div>
            </section>

            {/* ---------------- MESSAGE / WISHES ---------------- */}
            <section
                ref={sectionRef}
                className={`relative px-6 py-16 transition-all duration-700 sm:py-24 ${opened ? "opacity-100" : "opacity-90"
                    }`}
            >
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="font-indie text-4xl text-violet-900 sm:text-5xl">
                        Pesan untuk hari ini
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl font-sans text-violet-700/80">
                        Empat harapan kecil, dititipkan dengan tulus, khusus
                        untuk kamu yang sekarang resmi berusia 22 tahun.
                    </p>
                </div>

                <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
                    {WISHES.map((wish, i) => (
                        <WishCard key={wish.title} wish={wish} index={i} />
                    ))}
                </div>
            </section>

            {/* ---------------- CANDLE INTERACTION ---------------- */}
            <section className="relative px-6 py-16 sm:py-24">
                <div className="mx-auto max-w-2xl rounded-4xl border border-white/60 bg-white/50 px-6 py-12 text-center shadow-lg shadow-fuchsia-200/40 backdrop-blur-sm">
                    <h2 className="font-indie text-4xl text-violet-900 sm:text-5xl">
                        Tiup lilinnya, Pudan 🎂
                    </h2>
                    <p className="mt-3 font-sans text-violet-700/80">
                        Ketuk tiap lilin satu per satu, lalu buat permohonan
                        diam-diam.
                    </p>

                    <div className="mt-10 flex items-end justify-center gap-6">
                        {candlesLit.map((lit, i) => (
                            <button
                                key={i}
                                onClick={() => blowCandle(i)}
                                disabled={!lit}
                                aria-label={lit
                                    ? `Tiup lilin ${i + 1}`
                                    : `Lilin ${i + 1} sudah padam`}
                                className="group flex flex-col items-center focus:outline-none"
                            >
                                <span
                                    className={`mb-1 h-5 w-2.5 rounded-full bg-linear-to-t from-orange-400 via-yellow-300 to-yellow-100 transition-all duration-300 ${lit
                                            ? "candle-flame opacity-100"
                                            : "scale-0 opacity-0"
                                        }`}
                                />
                                <span
                                    className={`h-20 w-6 rounded-sm bg-linear-to-b from-fuchsia-300 to-violet-400 shadow-inner transition-transform ${lit
                                            ? "group-hover:-translate-y-0.5"
                                            : ""
                                        }`}
                                />
                                <span className="mt-2 h-2 w-10 rounded-full bg-violet-300/60" />
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 min-h-8 font-sans text-sm text-fuchsia-700">
                        {allCandlesOut
                            ? (
                                <p className="font-indie text-2xl text-fuchsia-600">
                                    Semoga permintaanmu terkabul ✨
                                </p>
                            )
                            : (
                                <p>
                                    {3 - candlesLit.filter(Boolean).length}{" "}
                                    dari 3 lilin sudah ditiup
                                </p>
                            )}
                    </div>

                    {allCandlesOut && (
                        <button
                            onClick={relightCandles}
                            className="mt-4 font-sans text-sm text-violet-500 underline-offset-4 hover:text-violet-700 hover:underline"
                        >
                            nyalakan ulang lilinnya
                        </button>
                    )}
                </div>
            </section>

            {/* ---------------- TIMELINE ---------------- */}
            <section className="relative px-6 py-16 sm:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="font-indie text-4xl text-violet-900 sm:text-5xl">
                        Sedikit perjalanan
                    </h2>
                </div>

                <div className="relative mx-auto mt-12 max-w-2xl">
                    <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-linear-to-b from-pink-300 via-fuchsia-300 to-violet-300 sm:left-1/2" />
                    <div className="space-y-8">
                        {TIMELINE.map((item, i) => (
                            <div
                                key={item.age}
                                className={`relative flex items-center gap-5 sm:gap-0 ${i % 2 === 0
                                        ? "sm:flex-row"
                                        : "sm:flex-row-reverse"
                                    }`}
                            >
                                <div
                                    className={`hidden flex-1 sm:block ${i % 2 === 0
                                            ? "text-right pr-8"
                                            : "text-left pl-8"
                                        }`}
                                >
                                    {i % 2 === 0 && (
                                        <p className="font-sans text-sm text-violet-600/80">
                                            {item.note}
                                        </p>
                                    )}
                                </div>

                                <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-fuchsia-500 to-violet-500 text-white shadow-md ring-4 ring-pink-50 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                                    <FaStar size={12} />
                                </div>

                                <div className="flex-1 rounded-2xl border border-white/60 bg-white/60 px-5 py-3 shadow-sm backdrop-blur-sm sm:hidden">
                                    <p className="font-indie text-xl text-violet-800">
                                        {item.age}
                                    </p>
                                    <p className="font-sans text-sm text-violet-600/80">
                                        {item.note}
                                    </p>
                                </div>

                                <div
                                    className={`hidden flex-1 sm:block ${i % 2 === 0
                                            ? "text-left pl-8"
                                            : "text-right pr-8"
                                        }`}
                                >
                                    {i % 2 !== 0
                                        ? (
                                            <p className="font-sans text-sm text-violet-600/80">
                                                {item.note}
                                            </p>
                                        )
                                        : (
                                            <p className="font-indie text-2xl text-violet-800">
                                                {item.age}
                                            </p>
                                        )}
                                </div>
                                {i % 2 === 0 && (
                                    <div className="absolute left-[calc(50%+1.5rem)] top-0 hidden font-indie text-2xl text-violet-800 sm:block">
                                        {item.age}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- FOOTER ---------------- */}
            <footer className="relative px-6 pb-16 pt-4 text-center">
                <p className="font-indie text-3xl text-violet-800 sm:text-4xl">
                    Selamat ulang tahun, Pudan 💜
                </p>
                <p className="mt-2 font-sans text-sm text-violet-500/80">
                    dibuat dengan banyak sayang, khusus untuk hari ke-22-mu.
                </p>
            </footer>

            <style>
                {`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(var(--drift)) rotate(var(--rotate));
            opacity: 0.4;
          }
        }
        .confetti-piece {
          animation-name: confetti-fall;
          animation-timing-function: ease-in;
          animation-fill-mode: forwards;
        }

        @keyframes ambient-float {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-60vh) scale(1.1); }
          100% { transform: translateY(-110vh) scale(0.9); }
        }
        .ambient-float {
          animation-name: ambient-float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes candle-flicker {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          50% { transform: scaleY(1.15) scaleX(0.9); }
        }
        .candle-flame {
          animation: candle-flicker 0.6s ease-in-out infinite;
        }

        .envelope-card {
          perspective: 800px;
        }

        @media (prefers-reduced-motion: reduce) {
          .confetti-piece, .ambient-float, .candle-flame {
            animation: none !important;
          }
        }
      `}
            </style>
        </main>
    );
};

export default Bd22Nd;
