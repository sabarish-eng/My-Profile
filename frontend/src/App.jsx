import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github, ServerCog, Linkedin, Workflow, Mail, ExternalLink, ChevronDown, ArrowRight, Code, Palette, Zap, Download, Send, Sparkles } from 'lucide-react';
import me from "./assets/yml.jpeg";
import project1 from "./assets/nm.jpg";
import project2 from "./assets/gs.png";
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  })
  const sendMessage = async () => {
    try {
      const res = await fetch("http://localhost:1000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
  const roles = ["Cloud Engineer", "DevOps Engineer", "System Administrator"];
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(section);
          break;
        }
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      if (observerRef.current) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };

  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, roles, typingSpeed]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const projects = [
    {
      title: 'Automated CI/CD Pipeline for Web Application using Jenkins',
      description: 'Built an automated CI/CD pipeline using Jenkins to streamline code integration, testing, and deployment for a web application.',
      tech: ['Docker', 'Jenkins', 'Terraform', 'Kubernetes'],
      image: project1,
      link: '#',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'React Application Hosting on Vercel',
      description: 'Hosted and deployed a React application on Vercel with automatic builds and seamless GitHub integration.',
      tech: ['Git & Github', 'Vercel', 'SonarQube',],
      image: project2,
      link: '#',
      gradient: 'from-blue-500 to-cyan-500'
    },
  ];

  const skills = [
    {
      category: 'AWS',
      icon: <ServerCog className="w-6 h-6" />,
      items: ['Amazon EC2', 'Amazon Lambda', 'Amazon S3', 'Route 53', 'Amazon RDS', 'Elastic Load Balancer'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      category: 'Azure',
      icon: <ServerCog className="w-6 h-6" />,
      items: ['Azure Virtual Machines', 'Azure App Service ', 'Azure Functions', 'Azure Storage', 'Azure DNS', 'Azure Kubernetes Service'],
      color: 'from-blue-500 to-indigo-500'
    },
    {
      category: 'Devops',
      icon: <Workflow className="w-6 h-6" />,
      items: ['Docker ', 'Jenkins', 'Kubernetes', 'Terraform', 'Ansible', 'Prometheus'],
      color: 'from-green-500 to-teal-500'
    },
    {
      category: 'Tools',
      icon: <Sparkles className="w-6 h-6" />,
      items: ['Git&Github', 'Figma', 'Vercel', 'Vs code', 'Adobe Photoshop', 'MS Office'],
      color: 'from-purple-500 to-violet-500'
    }
  ];

  return (
    <div className="relative bg-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Cursor Glow Effect */}
      <div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-50 mix-blend-screen opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: 'left 0.1s, top 0.1s'
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-slate-950/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Portfolio
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-xl rounded-full px-2 py-2 border border-white/10">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeSection === item.toLowerCase()
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></span>
                  )}
                  <span className="relative z-10">{item}</span>
                </button>
              ))}
            </div>

            <button
              className="md:hidden p-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-6 space-y-2 animate-fadeIn">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-6 py-3 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20">
        <div className="max-w-7xl w-full">
          <div className="text-center space-y-8 animate-fadeInUp">


            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="block text-gray-400 animate-slideInLeft">Hi, I'm</span>
              <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-slideInRight bg-[length:200%_auto] animate-gradient">
                SABARISH
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fadeIn animation-delay-300 h-8">
              {text}
              <span className="w-1 h-8 ml-1 bg-purple-500 inline-block animate-pulse" />
            </p>

            <div className="flex flex-wrap gap-4 justify-center items-center animate-fadeIn animation-delay-500">
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 rounded-full font-semibold border-2 border-white/20 hover:border-purple-500 hover:bg-white/5 backdrop-blur-xl transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center animate-fadeIn animation-delay-700">
              {[
                { icon: <Github className="w-5 h-5" />, link: 'https://github.com/sabarish-eng' },
                { icon: <Linkedin className="w-5 h-5" />, link: 'https://www.linkedin.com/in/sabarish-g-5046022b0/' },
                { icon: <Mail className="w-5 h-5" />, link: 'mailto:gsabari5159@gmail.com' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:scale-110 hover:border-purple-500 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-purple-400" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6 lg:px-8" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-slideInLeft">
              <p className="text-lg text-gray-300 leading-relaxed">
                Cloud & DevOps Engineer fresher with hands-on experience in AWS, Azure, Docker, and CI/CD. Passionate about automation, cloud infrastructure, and continuous learning.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I’m a passionate Cloud and DevOps Engineer fresher with hands-on experience in AWS, Azure, Docker, and CI/CD pipelines. I have worked on practical projects involving cloud deployment, automation, and basic monitoring. I enjoy learning new technologies, solving infrastructure challenges, and building scalable, reliable systems. I’m eager to start my professional journey and contribute to real-world cloud and DevOps environments.
              </p>
              <div className="flex gap-4 pt-4">
                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500 transition-all duration-300">
                  <Download className="w-5 h-5" />
                  Download CV
                </button>
              </div>
            </div>

            {/* Your Photo */}
            <div className="animate-slideInRight flex justify-center items-start ">
              <div className="group relative mb-20">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-75 group-hover:opacity-100 blur transition duration-500"></div>
                <div className="relative rounded-3xl overflow-hidden border-4 border-white/10 ">
                  <img
                    src={me}
                    alt="Sabarish"
                    className="w-[300px] h-[300px] object-cover "
                  />
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>



      {/* Skills Section */}
      <section id="skills" className="relative py-32 px-6 lg:px-8" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 animate-fadeInUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${skill.color} rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500`}></div>

                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${skill.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {skill.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-6 text-white">
                    {skill.category}
                  </h3>

                  <div className="space-y-3">
                    {skill.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group/item"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.color} group-hover/item:scale-150 transition-transform`}></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Projects Section */}
      <section id="projects" className="relative py-32 px-6 lg:px-8" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] animate-fadeInUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-500`}></div>

                <div className="relative">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

                    <a
                      href={project.link}
                      className="absolute top-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-sm text-purple-400 hover:bg-white/10 transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 lg:px-8" data-animate>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              I'm always open to new opportunities and collaborations. Let's create something amazing together!
            </p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition duration-500"></div>

            <div className="relative p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
              <form className="space-y-6" onSubmit={sendMessage}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-6 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 focus:outline-none transition-all text-white placeholder-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-6 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 focus:outline-none transition-all text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Message</label>
                  <textarea
                    rows="6"
                    placeholder="Tell me about your project..."
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-purple-500 focus:outline-none transition-all text-white placeholder-gray-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="group relative w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </form>

              {/* Contact Info */}
              <div className="mt-12 pt-12 border-t border-white/10 flex flex-wrap gap-8 justify-center">
                <a
                  href="mailto:gsabari5159@gmail.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group/link"
                >
                  <div className="p-3 rounded-full bg-white/5 group-hover/link:bg-purple-500/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>gsabari5159@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-center md:text-left">
              © 2026 Sabarish. Crafted with React & Tailwind CSS.
            </p>

            <div className="flex gap-4">
              {[
                { icon: <Github className="w-5 h-5" />, link: 'https://github.com/sabarish-eng' },
                { icon: <Linkedin className="w-5 h-5" />, link: 'https://www.linkedin.com/in/sabarish-g-5046022b0/' },
                { icon: <Mail className="w-5 h-5" />, link: 'mailto:gsabari5159@gmail.com' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:scale-110 hover:border-purple-500 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Add Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        
        .animation-delay-700 {
          animation-delay: 700ms;
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }
      `}</style>
    </div >
  );
};
