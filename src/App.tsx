/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Menu, 
  X, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Droplets,
  Scissors,
  ShieldCheck,
  Award,
  Users,
  Stethoscope
} from 'lucide-react';

import heroImg from './images/hero.png';
import docImg from './images/doc.png';
import before1Img from './images/before1.png';
import after1Img from './images/after1.png';
import before2Img from './images/before2.png';
import after2Img from './images/after2.png';
import before3Img from './images/before3.png';
import after3Img from './images/after3.png';

// --- Types ---

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'skin' | 'hair';
}

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}

interface BeforeAfter {
  id: number;
  category: string;
  before: string;
  after: string;
  title: string;
}

// --- Data ---

const SKIN_SERVICES: Service[] = [
  { id: 's1', title: 'Acne & Scars', description: 'Advanced treatments for active acne and stubborn scars.', icon: <Sparkles className="w-6 h-6" />, category: 'skin' },
  { id: 's2', title: 'Pigmentation', description: 'Solutions for melasma, tanning, and dark spots.', icon: <Droplets className="w-6 h-6" />, category: 'skin' },
  { id: 's3', title: 'Anti-Aging', description: 'Reduce wrinkles and fine lines for youthful skin.', icon: <ShieldCheck className="w-6 h-6" />, category: 'skin' },
  { id: 's4', title: 'Glow Therapy', description: 'Skin rejuvenation for a natural, healthy radiance.', icon: <Sparkles className="w-6 h-6" />, category: 'skin' },
  { id: 's5', title: 'Chemical Peels', description: 'Medical-grade peels for smoother skin texture.', icon: <Droplets className="w-6 h-6" />, category: 'skin' },
  { id: 's6', title: 'Laser Hair Removal', description: 'Pain-free, permanent hair reduction technology.', icon: <Sparkles className="w-6 h-6" />, category: 'skin' },
];

const HAIR_SERVICES: Service[] = [
  { id: 'h1', title: 'Hair Fall Control', description: 'Personalized treatments to stop hair loss effectively.', icon: <Scissors className="w-6 h-6" />, category: 'hair' },
  { id: 'h2', title: 'PRP Therapy', description: 'Platelet-Rich Plasma therapy for natural hair growth.', icon: <Droplets className="w-6 h-6" />, category: 'hair' },
  { id: 'h3', title: 'Mesotherapy', description: 'Nutrient-rich injections for scalp health.', icon: <Droplets className="w-6 h-6" />, category: 'hair' },
  { id: 'h4', title: 'Dandruff Solutions', description: 'Effective treatments for persistent scalp issues.', icon: <Droplets className="w-6 h-6" />, category: 'hair' },
];

const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Priya Sharma", text: "Dr. Gaurav is amazing! My acne scars have significantly faded after just 3 sessions. Highly recommended.", rating: 5 },
  { id: 2, name: "Rahul Verma", text: "Best hair treatment in Ghaziabad. I was worried about hair thinning, but the PRP therapy worked wonders.", rating: 5 },
  { id: 3, name: "Anjali Gupta", text: "Very professional and clean clinic. The staff is polite and the doctor explains everything clearly.", rating: 5 },
  { id: 4, name: "Vikram Singh", text: "I had a great experience with laser hair removal. It was virtually painless and very effective.", rating: 5 },
  { id: 5, name: "Sneha Kapoor", text: "The glow therapy is fantastic! My skin feels so refreshed and radiant. Definitely coming back.", rating: 5 },
  { id: 6, name: "Amit Patel", text: "Excellent results for my melasma. Dr. Gaurav's treatment plan was very effective and easy to follow.", rating: 5 },
];

const BEFORE_AFTER_DATA: BeforeAfter[] = [
  { id: 1, category: "Acne Treatment", title: "Severe Acne to Clear Skin", before: before1Img, after: after1Img },
  { id: 2, category: "Hair Regrowth", title: "Hair Thinning Recovery", before: before2Img, after: after2Img },
  { id: 3, category: "Pigmentation", title: "Melasma Treatment Results", before: before3Img, after: after3Img },
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-clinic-accent rounded-lg flex items-center justify-center text-white font-bold text-xl">G</div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-gray-900">Dr Gaurav</h1>
            <p className="text-[10px] uppercase tracking-widest text-clinic-accent font-semibold">Hair & Skin Laser Clinic</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-sm font-medium hover:text-clinic-accent transition-colors">Home</a>
          <a href="#about" className="text-sm font-medium hover:text-clinic-accent transition-colors">About</a>
          <a href="#services" className="text-sm font-medium hover:text-clinic-accent transition-colors">Services</a>
          <a href="#results" className="text-sm font-medium hover:text-clinic-accent transition-colors">Results</a>
          <a href="#contact" className="btn-primary !py-2 !px-6 text-sm">Book Now</a>
        </div>

        <button className="md:hidden text-gray-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-6 flex flex-col gap-4 md:hidden"
          >
            <a href="#home" onClick={() => setIsOpen(false)} className="text-lg font-medium">Home</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="text-lg font-medium">About</a>
            <a href="#services" onClick={() => setIsOpen(false)} className="text-lg font-medium">Services</a>
            <a href="#results" onClick={() => setIsOpen(false)} className="text-lg font-medium">Results</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="btn-primary text-center">Book Appointment</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ComparisonSlider = ({ item }: { item: BeforeAfter, key?: React.Key }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div className="space-y-4">
      <div 
        ref={containerRef}
        className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-lg"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        <img src={item.after} alt="After" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img src={item.before} alt="Before" className="absolute inset-0 w-full h-full object-cover max-w-none" style={{ width: containerRef.current?.offsetWidth }} referrerPolicy="no-referrer" />
        </div>
        <div 
          className="absolute inset-y-0 w-1 bg-white shadow-xl flex items-center justify-center"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-1 h-3 bg-clinic-accent rounded-full" />
              <div className="w-1 h-3 bg-clinic-accent rounded-full" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">Before</div>
        <div className="absolute bottom-4 right-4 bg-clinic-accent/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">After</div>
      </div>
      <div className="text-center">
        <span className="text-xs font-bold text-clinic-accent uppercase tracking-wider">{item.category}</span>
        <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
      </div>
    </div>
  );
};

const ServiceCard = ({ service }: { service: Service }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="service-card group"
  >
    <div className="w-14 h-14 bg-skin-100 rounded-2xl flex items-center justify-center text-clinic-accent mb-6 group-hover:bg-clinic-accent group-hover:text-white transition-colors duration-300">
      {service.icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.description}</p>
    <a href="#contact" className="text-clinic-accent font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
      Consult Now <ArrowRight className="w-4 h-4" />
    </a>
  </motion.div>
);

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'skin' | 'hair'>('skin');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const concern = formData.get('concern');
    const time = formData.get('time');

    const message = `Hello Dr. Gaurav, I would like to book an appointment.%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Concern:* ${concern}%0A*Preferred Time:* ${time}`;
    window.open(`https://api.whatsapp.com/send?phone=919899025006&text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 overflow-hidden bg-skin-50">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-clinic-blue/30 -skew-x-12 translate-x-1/4 z-0" />
        <div className="section-padding relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-clinic-teal animate-pulse" />
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Now Open in Raj Nagar Extension</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
              Healthy Skin. <br />
              <span className="text-clinic-accent">Strong Hair.</span> <br />
              Confident You.
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              Experience premium, personalized skin and hair treatments by Dr Gaurav. 
              Advanced technology meets compassionate care for results that last.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="btn-primary flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Book Appointment
              </a>
              <a href="https://api.whatsapp.com/send?phone=919899025006" target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> WhatsApp Now
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-clinic-accent">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">20+ Years</p>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Experience</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-clinic-accent">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">10k+</p>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Happy Patients</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src={heroImg} 
                alt="Dermatology Skin Care" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-clinic-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-clinic-teal/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -right-4 translate-y-[-50%] bg-white p-4 rounded-2xl shadow-xl z-20 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Verified Specialist</p>
                  <p className="text-[10px] text-gray-500">Certified Cosmetologist</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Doctor Section */}
      <section id="about" className="section-padding bg-white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img 
                src={docImg} 
                alt="Dr Gaurav" 
                className="rounded-3xl shadow-lg w-full min-h-[400px] bg-gray-100 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-clinic-accent text-white p-8 rounded-3xl shadow-xl max-w-[240px]">
                <p className="text-3xl font-bold mb-1">2003</p>
                <p className="text-sm font-medium opacity-90">Providing high-quality personalized care since 2003</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-clinic-accent font-bold uppercase tracking-widest text-sm mb-4 block">The Expert Behind Your Care</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Meet Dr Gaurav</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Dr Gaurav has been providing high-quality, personalized care since 2003. With years of experience in skin and hair treatments, he has successfully treated thousands of patients across all age groups.
              </p>
              <p>
                As a dedicated skin and hair specialist, his mission is to help individuals feel confident in their own skin—both physically and emotionally.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-clinic-accent"><CheckCircle2 className="w-5 h-5" /></div>
                  <p className="text-sm font-medium text-gray-800">Clear Communication</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-clinic-accent"><CheckCircle2 className="w-5 h-5" /></div>
                  <p className="text-sm font-medium text-gray-800">Compassionate Care</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-clinic-accent"><CheckCircle2 className="w-5 h-5" /></div>
                  <p className="text-sm font-medium text-gray-800">Long-term Solutions</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-clinic-accent"><CheckCircle2 className="w-5 h-5" /></div>
                  <p className="text-sm font-medium text-gray-800">Advanced Technology</p>
                </div>
              </div>
            </div>
            <div className="mt-10 p-6 bg-skin-50 rounded-2xl border border-skin-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-clinic-accent" /> Specializations
              </h4>
              <ul className="text-sm text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <li>• Acne & Pigmentation</li>
                <li>• Hair Loss Disorders</li>
                <li>• Eczema & Allergies</li>
                <li>• Cosmetic Aesthetics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-skin-50">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-clinic-accent font-bold uppercase tracking-widest text-sm mb-4 block">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Comprehensive Treatments</h2>
          <p className="text-gray-600">We offer a wide range of medical and aesthetic treatments tailored to your unique skin and hair needs.</p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button 
            onClick={() => setActiveCategory('skin')}
            className={`px-8 py-3 rounded-full font-bold transition-all ${activeCategory === 'skin' ? 'bg-clinic-accent text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            Skin Treatments
          </button>
          <button 
            onClick={() => setActiveCategory('hair')}
            className={`px-8 py-3 rounded-full font-bold transition-all ${activeCategory === 'hair' ? 'bg-clinic-accent text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            Hair Treatments
          </button>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {(activeCategory === 'skin' ? SKIN_SERVICES : HAIR_SERVICES).map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Before & After Section */}
      <section id="results" className="section-padding bg-white overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-clinic-accent font-bold uppercase tracking-widest text-sm mb-4 block">Real Transformations</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Visible Results</h2>
          <p className="text-gray-600">See the real-life impact of our personalized treatment plans. Slide to compare before and after.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {BEFORE_AFTER_DATA.map((item) => (
            <ComparisonSlider key={item.id} item={item} />
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-12 italic">* Results may vary from person to person based on individual conditions.</p>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-clinic-blue/20 overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-clinic-accent font-bold uppercase tracking-widest text-sm mb-4 block">Patient Stories</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Patients Say</h2>
        </div>

        <div className="flex relative">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex gap-6 whitespace-nowrap"
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
              <div key={`${t.id}-${idx}`} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col w-[350px] shrink-0 whitespace-normal">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic mb-6 flex-grow">"{t.text}"</p>
                <div className="pt-4 border-t border-gray-50">
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Verified Patient</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="bg-clinic-teal rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 lg:p-20 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Book Your <br /> Consultation</h2>
            <p className="text-clinic-blue/80 mb-12 leading-relaxed">
              Take the first step towards healthy skin and hair. Fill out the form and our team will get back to you to confirm your slot.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-70">Call Us Directly</p>
                  <p className="text-xl font-bold">+91 9899025006</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-70">Visit Clinic</p>
                  <p className="text-lg font-bold">Shop No. FF-09, Agarwal Plaza, Raj Nagar Extension, Ghaziabad</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-70">Clinic Timings</p>
                  <p className="text-lg font-bold">Tuesday Closed</p>
                  <p className="text-sm font-medium">Other Days: 10 AM – 2 PM, 5 PM – 8:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 bg-white p-12 lg:p-20">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                  <input name="name" type="text" required placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-clinic-accent focus:ring-0 transition-all outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Phone Number</label>
                  <input name="phone" type="tel" required placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-clinic-accent focus:ring-0 transition-all outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Primary Concern</label>
                <select name="concern" required className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-clinic-accent focus:ring-0 transition-all outline-none appearance-none">
                  <option value="">Select Concern</option>
                  <option>Acne & Scars</option>
                  <option>Hair Loss</option>
                  <option>Pigmentation</option>
                  <option>Laser Hair Removal</option>
                  <option>Anti-Aging</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Preferred Time</label>
                <select name="time" required className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-clinic-accent focus:ring-0 transition-all outline-none appearance-none">
                  <option>Morning (10 AM - 2 PM)</option>
                  <option>Evening (5 PM - 8:30 PM)</option>
                </select>
              </div>
              <button type="submit" className="w-full btn-primary !py-4 text-lg">
                Book Consultation
              </button>
              <p className="text-center text-xs text-gray-400">By clicking, you agree to our privacy policy and terms.</p>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[450px] w-full relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.543542214749!2d77.4306101!3d28.7054805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf0e49e0a1f5d%3A0x6e96d58d7246e6b!2sDr%20Gaurav%20-%20Hair%20and%20skin%20clinic%20in%20Rajnagar%20Extension!5e0!3m2!1sen!2sin!4v1712060000000!5m2!1sen!2sin" 
          className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-clinic-accent rounded-full flex items-center justify-center text-white">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Dr Gaurav Clinic</p>
              <p className="text-xs text-gray-500">Raj Nagar Extension, Ghaziabad</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="section-padding grid md:grid-cols-2 lg:grid-cols-4 gap-12 !py-0 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-clinic-accent rounded-lg flex items-center justify-center text-white font-bold text-xl">G</div>
              <div>
                <h1 className="text-lg font-bold leading-tight">Dr Gaurav</h1>
                <p className="text-[10px] uppercase tracking-widest text-clinic-accent font-semibold">Hair & Skin Laser Clinic</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium dermatology and cosmetology clinic providing advanced laser treatments and personalized care since 2003.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#home" className="hover:text-clinic-accent transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-clinic-accent transition-colors">About Doctor</a></li>
              <li><a href="#services" className="hover:text-clinic-accent transition-colors">Treatments</a></li>
              <li><a href="#results" className="hover:text-clinic-accent transition-colors">Results</a></li>
              <li><a href="#contact" className="hover:text-clinic-accent transition-colors">Book Appointment</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Treatments</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>Acne & Scar Removal</li>
              <li>Laser Hair Removal</li>
              <li>PRP Therapy</li>
              <li>Anti-Aging Solutions</li>
              <li>Pigmentation Therapy</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Contact Info</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-clinic-accent shrink-0" />
                <span>Shop No. FF-09, Agarwal Plaza, Raj Nagar Extension, Ghaziabad, UP 201003</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-clinic-accent shrink-0" />
                <span>+91 9899025006</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-clinic-accent shrink-0" />
                <span>Tue: Closed | Other Days: 10 AM – 2 PM, 5 PM – 8:30 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/10 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs text-center">
            © {new Date().getFullYear()} Dr Gaurav - Hair & Skin Laser Clinic. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://api.whatsapp.com/send?phone=919899025006" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><MessageCircle className="w-5 h-5" /></a>
            <a href="tel:919899025006" className="text-gray-500 hover:text-white transition-colors"><Phone className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>

      {/* Floating Actions */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <motion.a 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://api.whatsapp.com/send?phone=919899025006" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 transition-colors"
        >
          <MessageCircle className="w-7 h-7" />
        </motion.a>
        <motion.a 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="tel:919899025006" 
          className="w-14 h-14 bg-clinic-accent text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-opacity-90 transition-colors md:hidden"
        >
          <Phone className="w-7 h-7" />
        </motion.a>
      </div>
    </div>
  );
}
