import { useState } from 'react';
import { Palette, Code, Sparkles, ArrowRight, CheckCircle, Mail, Phone, MapPin, X, Menu } from 'lucide-react';
import HamburgerMenu from './HamburgerMenu';

export default function ArtNest() {
  const [activeProject, setActiveProject] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const projects = [
    { title: "E-Commerce Platform", category: "UI/UX Design", description: "Complete redesign of a modern e-commerce platform with focus on user experience and conversion optimization.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
    { title: "Mobile Banking App", category: "App Design", description: "Intuitive mobile banking interface designed for seamless financial management on the go.", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80" },
    { title: "SaaS Dashboard", category: "Web Design", description: "Analytics dashboard with complex data visualization and streamlined user workflows.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
    { title: "Brand Identity System", category: "Branding", description: "Comprehensive brand identity including logo, color palette, and design guidelines.", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80" }
  ];

  const services = [
    { icon: Palette, title: "UI/UX Design", description: "Beautiful, intuitive interfaces that users love", features: ["User Research", "Wireframing", "Prototyping", "Visual Design"] },
    { icon: Code, title: "Web Development", description: "Fast, responsive websites built with modern tech", features: ["React & Next.js", "Responsive Design", "Performance Optimization", "SEO Ready"] },
    { icon: Sparkles, title: "Brand Design", description: "Memorable brand identities that stand out", features: ["Logo Design", "Color Systems", "Typography", "Design Systems"] }
  ];

  const scrollToContact = () => document.getElementById('contact-footer')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-black text-white">
      <HamburgerMenu />
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl tracking-tight">Art<span className="text-emerald-400">Nest</span></div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#work" className="hover:text-emerald-400 transition">Work</a>
            <a href="#services" className="hover:text-emerald-400 transition">Services</a>
            <a href="#process" className="hover:text-emerald-400 transition">Process</a>
            <button onClick={scrollToContact} className="hover:text-emerald-400 transition">Contact</button>
            <button className="px-5 py-2 rounded-lg bg-emerald-500 text-black hover:bg-emerald-400 transition">Start Project</button>
          </nav>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 border-b border-white/10 py-4 px-6 flex flex-col gap-4">
            <a href="#work" className="hover:text-emerald-400">Work</a>
            <a href="#services" className="hover:text-emerald-400">Services</a>
            <a href="#process" className="hover:text-emerald-400">Process</a>
            <button onClick={scrollToContact} className="text-left hover:text-emerald-400">Contact</button>
            <button className="px-5 py-2 rounded-lg bg-emerald-500 text-black">Start Project</button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-black to-purple-500/10" />
        <div className="absolute inset-0"><div className="absolute top-1/4 left-1/4 size-96 bg-emerald-500/20 rounded-full blur-3xl" /><div className="absolute bottom-1/4 right-1/4 size-96 bg-purple-500/20 rounded-full blur-3xl" /></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400/10 border border-emerald-400/20 rounded-full mb-8"><span className="size-2 bg-emerald-400 rounded-full animate-pulse" /><span className="text-sm text-emerald-400">Available for new projects</span></div>
            <h1 className="text-8xl mb-8 leading-tight">Design that<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-400">drives results</span></h1>
            <p className="text-2xl text-gray-400 mb-12 max-w-2xl">We craft exceptional digital experiences through thoughtful UI/UX design and modern web development.</p>
            <div className="flex items-center gap-4"><button className="px-8 py-4 bg-emerald-400 text-black rounded-full hover:bg-emerald-300 transition-all flex items-center gap-2 group">View Our Work<ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" /></button><button className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-colors">Get In Touch</button></div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section id="work" className="py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6"><div className="mb-16"><h2 className="text-6xl mb-4">Featured Work</h2><p className="text-xl text-gray-400">Recent projects that showcase our expertise</p></div>
        <div className="grid md:grid-cols-2 gap-8">{projects.map((project, index) => (
          <div key={index} className="group cursor-pointer" onMouseEnter={() => setActiveProject(index)}>
            <div className="relative h-96 rounded-2xl overflow-hidden mb-6"><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" /><img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /><div className="absolute bottom-6 left-6 z-20"><div className="text-sm text-emerald-400 mb-2">{project.category}</div></div></div>
            <h3 className="text-3xl mb-3 group-hover:text-emerald-400 transition-colors">{project.title}</h3><p className="text-gray-400">{project.description}</p>
          </div>
        ))}</div></div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6"><div className="text-center mb-16"><h2 className="text-6xl mb-4">What We Do</h2><p className="text-xl text-gray-400">End-to-end design and development services</p></div>
        <div className="grid md:grid-cols-3 gap-8">{services.map((service, index) => (
          <div key={index} className="bg-black border border-white/10 rounded-2xl p-8 hover:border-emerald-400/50 transition-all group">
            <div className="size-16 bg-emerald-400/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-400/20 transition-colors"><service.icon className="size-8 text-emerald-400" /></div>
            <h3 className="text-2xl mb-3">{service.title}</h3><p className="text-gray-400 mb-6">{service.description}</p>
            <ul className="space-y-3">{service.features.map((feature, i) => <li key={i} className="flex items-center gap-3 text-sm text-gray-400"><CheckCircle className="size-4 text-emerald-400 flex-shrink-0" />{feature}</li>)}</ul>
          </div>
        ))}</div></div>
      </section>

      {/* Process */}
      <section id="process" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6"><div className="mb-16"><h2 className="text-6xl mb-4">Our Process</h2><p className="text-xl text-gray-400">A proven approach to exceptional results</p></div>
        <div className="grid md:grid-cols-4 gap-8">{[
          { step: "01", title: "Discovery", desc: "Understanding your goals and users" },
          { step: "02", title: "Design", desc: "Crafting the perfect solution" },
          { step: "03", title: "Develop", desc: "Building with precision and care" },
          { step: "04", title: "Deliver", desc: "Launching and supporting your success" }
        ].map((item, index) => (
          <div key={index} className="relative"><div className="text-7xl text-white/5 mb-4">{item.step}</div><h3 className="text-2xl mb-3 text-emerald-400">{item.title}</h3><p className="text-gray-400">{item.desc}</p></div>
        ))}</div></div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center"><h2 className="text-7xl mb-6">Let's create something<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-400">extraordinary</span></h2><p className="text-xl text-gray-400 mb-12">Ready to elevate your digital presence? Let's discuss your project.</p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"><form className="space-y-6"><div className="grid md:grid-cols-2 gap-6"><input type="text" placeholder="Your Name" className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors" /><input type="email" placeholder="Your Email" className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors" /></div><textarea placeholder="Tell us about your project..." rows={5} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors resize-none" /><button type="submit" className="w-full px-8 py-4 bg-emerald-400 text-black rounded-xl hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2"><Mail className="size-5" />Send Message</button></form></div></div>
      </section>

      {/* Footer */}
      <footer id="contact-footer" className="border-t border-gray-800 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div><div className="text-2xl font-bold mb-4">Art<span className="text-emerald-400">Nest</span></div><p className="text-gray-400 mb-6">UI/UX design and web development.</p><div className="space-y-3 text-gray-400"><div className="flex gap-3"><Mail /> hello@artnest.com</div><div className="flex gap-3"><Phone /> +1 (555) 456-7890</div><div className="flex gap-3"><MapPin /> London, UK</div></div></div>
            <div><h3 className="text-xl mb-4">Send us a message</h3><form className="space-y-4" onSubmit={(e) => e.preventDefault()}><input type="text" placeholder="Your name" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" /><input type="email" placeholder="Your email" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" /><textarea rows={3} placeholder="Message" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white resize-none"></textarea><button type="submit" className="px-6 py-2 bg-emerald-500 text-black rounded-lg hover:bg-emerald-400">Send Message</button></form></div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm"><div className="mb-2">Nexa<span className="text-emerald-400">Solutions</span> — All rights reserved © 2026</div><button onClick={() => window.dispatchEvent(new CustomEvent('reset-portfolio'))} className="text-emerald-400 hover:text-emerald-300">← Back to all projects</button></div>
        </div>
      </footer>
    </div>
  );
}