import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-6 pt-12">
            <div className="p-5 w-11/12 mx-auto">
                <div className="grid lg:grid-cols-3 grid-cols-2  mb-20 gap-20">
                    <div className="lg:col-span-1 col-span-2">
                        <h2 className="font-extrabold text-4xl text-[#00A8E7] pb-5">
                            MovieMaster Pro
                        </h2>
                        <p className="2xl:pr-30">MovieMaster Pro is a user-friendly platform to discover, browse, and track movies across all genres. Find movie details, explore genres, and stay updated with your favorite films in one place.</p>
                    </div>
                    <div>
                        <div>
                            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/" className="hover:text-white transition">Home</Link>
                                </li>
                                <li>
                                    <Link to="/all-movies" className="hover:text-white transition">All Movies</Link>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div className="flex flex-col  gap-4 ">
                        <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-white transition"
                        >
                            <FaFacebookF /> Facebook
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-white transition"
                        >
                            <FaTwitter /> Twitter
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-white transition"
                        >
                            <FaInstagram /> Instagram
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-white transition"
                        >
                            <FaYoutube /> YouTube
                        </a>
                    </div>

                </div>
                <hr />
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center pt-5">
                    <p className="text-sm text-center md:text-left">
                        &copy; {new Date().getFullYear()} MovieMaster Pro. All rights reserved.
                    </p>
                    <div className="flex gap-4 mt-2 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors text-sm">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-white transition-colors text-sm">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
