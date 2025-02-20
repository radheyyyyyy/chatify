import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col">
            {/* Navigation */}
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <MessageSquare className="text-white" size={32} />
                        <span className="text-white text-2xl font-bold">Chatify</span>
                    </div>
                    <div className="space-x-4">
                        <button
                            className="px-6 py-2 text-white hover:text-blue-100 transition-colors"
                            onClick={() => navigate("/signin")}>
                            Login
                        </button>
                        <button
                            className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                            onClick={() => navigate("/signup")}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 container mx-auto px-6 py-16 flex items-center">
                <div className="w-full md:w-1/2">
                    <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                        Connect with friends instantly
                    </h1>
                    <p className="text-xl text-blue-100 mb-8">
                        Experience seamless communication with our modern chat platform. Share messages, photos, and
                        stay connected with your loved ones.
                    </p>
                    <div className="space-x-4">
                        <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                            Get Started
                        </button>
                        <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
                <div className="hidden md:block w-1/2">
                    <img
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                        alt="Chat illustration"
                        className="w-full h-auto rounded-lg shadow-2xl transform -rotate-6"
                    />
                </div>
            </main>

            {/* Features Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Chatify?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-gray-50 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-time Chat</h3>
                            <p className="text-gray-600">
                                Experience instant messaging with real-time message delivery and typing indicators.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure & Private</h3>
                            <p className="text-gray-600">
                                Your conversations are protected with end-to-end encryption for maximum privacy.
                            </p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Cross-platform</h3>
                            <p className="text-gray-600">
                                Stay connected across all your devices with our cross-platform support.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <MessageSquare size={24} />
                            <span className="text-xl font-bold">Chatify</span>
                        </div>
                        <div className="flex space-x-6">
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                About
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                Privacy
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                Terms
                            </a>
                            <a href="#" className="hover:text-blue-400 transition-colors">
                                Contact
                            </a>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-gray-400 text-sm">© 2025 Chatify. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
};
