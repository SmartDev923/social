import SectionTitle from "../Common/SectionTitle";
import Link from "next/link";

const ContactSales = () => {
    return (
        <section id="contact-sales" className="py-16 md:py-20 lg:py-28">
            <div className="container">
                <SectionTitle
                    title="Talk to Our Team"
                    paragraph="Tell us about your hiring needs and we’ll help you get started with talentgauges."
                    center
                />

                <div className="relative mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-8 shadow-md dark:border-gray-800 dark:bg-dark">
                    {/* subtle inner decorators */}
                    <span className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl dark:bg-primary/20" />
                    <span className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-[#4A6CF7]/10 blur-2xl dark:bg-[#4A6CF7]/20" />

                    {/* decorative SVGs copied from NewsLatterBox */}
                    <span className="absolute right-0 top-0">
                        <svg width="162" height="91" viewBox="0 0 162 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.3">
                                <path opacity="0.45" d="M1 89.9999C8 77.3332 27.7 50.7999 50.5 45.9999C79 39.9999 95 41.9999 106 30.4999C117 18.9999 126 -3.50014 149 -3.50014C172 -3.50014 187 4.99986 200.5 -8.50014C214 -22.0001 210.5 -46.0001 244 -37.5001C270.8 -30.7001 307.167 -45 322 -53" stroke="url(#paint0_linear_cs_603)" />
                                <path opacity="0.45" d="M43 64.9999C50 52.3332 69.7 25.7999 92.5 20.9999C121 14.9999 137 16.9999 148 5.49986C159 -6.00014 168 -28.5001 191 -28.5001C214 -28.5001 229 -20.0001 242.5 -33.5001C256 -47.0001 252.5 -71.0001 286 -62.5001C312.8 -55.7001 349.167 -70 364 -78" stroke="url(#paint1_linear_cs_603)" />
                                <path opacity="0.45" d="M4 73.9999C11 61.3332 30.7 34.7999 53.5 29.9999C82 23.9999 98 25.9999 109 14.4999C120 2.99986 129 -19.5001 152 -19.5001C175 -19.5001 190 -11.0001 203.5 -24.5001C217 -38.0001 213.5 -62.0001 247 -53.5001C273.8 -46.7001 310.167 -61 325 -69" stroke="url(#paint2_linear_cs_603)" />
                                <path opacity="0.45" d="M41 40.9999C48 28.3332 67.7 1.79986 90.5 -3.00014C119 -9.00014 135 -7.00014 146 -18.5001C157 -30.0001 166 -52.5001 189 -52.5001C212 -52.5001 227 -44.0001 240.5 -57.5001C254 -71.0001 250.5 -95.0001 284 -86.5001C310.8 -79.7001 347.167 -94 362 -102" stroke="url(#paint3_linear_cs_603)" />
                            </g>
                            <defs>
                                <linearGradient id="paint0_linear_cs_603" x1="291.35" y1="12.1032" x2="179.211" y2="237.617" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.328125" stopColor="#4A6CF7" />
                                    <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id="paint1_linear_cs_603" x1="333.35" y1="-12.8968" x2="221.211" y2="212.617" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.328125" stopColor="#4A6CF7" />
                                    <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id="paint2_linear_cs_603" x1="294.35" y1="-3.89678" x2="182.211" y2="221.617" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.328125" stopColor="#4A6CF7" />
                                    <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id="paint3_linear_cs_603" x1="331.35" y1="-36.8968" x2="219.211" y2="188.617" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.328125" stopColor="#4A6CF7" />
                                    <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                    <form className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm text-black dark:text-white">Full Name</label>
                            <input type="text" placeholder="Jane Doe" className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm text-black dark:text-white">Work Email</label>
                            <input type="email" placeholder="name@company.com" className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm text-black dark:text-white">Company</label>
                            <input type="text" placeholder="Binance" className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm text-black dark:text-white">Role / Title</label>
                            <input type="text" placeholder="Head of Talent" className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm text-black dark:text-white">How can we help?</label>
                            <textarea rows={4} placeholder="Share your hiring goals, timeline, and roles" className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none" />
                        </div>
                        <div className="md:col-span-2 flex items-center justify-between">
                            <button className="rounded-sm bg-primary px-8 py-3 font-semibold text-white transition hover:bg-primary/90">Contact Sales</button>
                            <Link href="mailto:support@w3career.io" className="text-sm text-body-color hover:underline dark:text-body-color-dark">Email support@talentgauges.io</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSales;


