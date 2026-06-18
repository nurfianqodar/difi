import type React from "react";
import { Typewriter } from "react-simple-typewriter";
import videoUrl from "../assets/hero-bg.webm";
import { FiHeart } from "react-icons/fi";
import { HiEmojiSad } from "react-icons/hi";
import { SiInsomnia } from "react-icons/si";
import { BiHappy } from "react-icons/bi";
import { FaBirthdayCake } from "react-icons/fa";
import { Link } from "react-router";

export type DashboardProps = {};

export const Dashboard: React.FC<DashboardProps> = () => {
    const words = [
        "miss me",
        "miss our memory",
        "feel tired",
        "can't sleep",
        "miss me ❤️",
    ];

    const menu = [
        {
            label: "Happy",
            icon: <BiHappy />,
            href: "/happy",
        },
        {
            label: "Miss me",
            icon: <FiHeart />,
            href: "/galery",
        },
        {
            label: "Sad",
            icon: <HiEmojiSad />,
            href: "/mnj",
        },
        {
            label: "Can't sleep",
            icon: <SiInsomnia />,
            href: "/letters",
        },
    ];

    return (
        <main>
            <section className="flex justify-center relative overflow-hidden min-h-screen">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source src={videoUrl} type="video/webm" />
                </video>

                <div className="absolute inset-0 bg-black/50" />

                <div className="container flex flex-col items-center relative z-10 justify-center my-32 gap-y-10">
                    <h1 className="text-5xl text-white text-center">
                        Open when you
                        <br />
                        <span className="font-semibold" aria-live="polite">
                            <Typewriter words={words} cursor />
                        </span>
                    </h1>
                    <p className="text-center text-4xl text-white">
                        Distance belongs to space, Love doesn't.
                    </p>

                    <Link
                        to="#menu-section"
                        className="text-white underline text-xl"
                    >
                        What do u feel?
                    </Link>
                </div>
            </section>

            <section
                id="menu-section"
                className="flex items-center justify-center"
            >
                <div className="container mt-32 mb-16 flex flex-col gap-y-10 mx-5">
                    <h2 className="font-semibold text-3xl text-center">
                        How are you feeling right now?
                    </h2>

                    <ul className="flex flex-wrap items-center gap-5 justify-center">
                        {menu.map(({ href, icon, label }) => {
                            return (
                                <li className="flex basis-32 flex-1 items-center justify-center rounded-xl shadow-lg">
                                    <Link
                                        to={href}
                                        className="p-5 w-full flex flex-col items-center gap-y-2"
                                    >
                                        <div className="text-3xl">{icon}</div>
                                        <div className="text-xl">{label}</div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            <section
                id="menu-section"
                className="flex items-center justify-center"
            >
                <div className="container my-16 flex flex-col gap-y-10 mx-5">
                    <h2>Other</h2>
                    <ul>
                        <li>
                            <Link to="/bd/22">
                                <div>
                                    <FaBirthdayCake />
                                </div>
                                <div>
                                    Pudan&apos;s 22nd Birthday
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    );
};
