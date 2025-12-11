import React, { useState, useEffect } from 'react';
import { SOCIAL_LINKS, PRIMARY_EMAIL, CARAI_OG_IMAGE } from '../constants';
import { Mail, Send, CheckCircle, ArrowLeft, ChevronDown, Upload, HelpCircle, AlertCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { sendContact, ContactPayload } from '../services/contactService';
import { trackEvent } from '../lib/analytics';
import SEO from './SEO';

type ServiceType = 
  | 'one-page' 
  | 'multi-page' 
  | 'ai-augmented' 
  | 'partial-backend' 
  | 'full-backend' 
  | 'automation-only' 
    | 'graphic-designs'
  | 'collab' 
  | 'support';

const SERVICE_OPTIONS: { value: ServiceType; label: string }[] = [
  { value: 'one-page', label: 'One-Page Landing Website' },
  { value: 'multi-page', label: 'Multi-Page Website' },
  { value: 'ai-augmented', label: 'Website + AI Automation' },
  { value: 'partial-backend', label: 'Website With Partial Backend' },
  { value: 'full-backend', label: 'Website With Full Backend' },
  { value: 'automation-only', label: 'AI Automation Only' },
    { value: 'graphic-designs', label: 'Graphic Designs & Branding' },
  { value: 'collab', label: 'Collaboration / Partnerships' },
  { value: 'support', label: 'Customer Support / Existing Project' },
];

const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [serviceType, setServiceType] = useState<ServiceType>('one-page');
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Generic Form Data State
  const [formData, setFormData] = useState<Record<string, any>>({
    fullName: '',
    email: '',
    whatsapp: '',
    brandName: '',
    website: '',
    referral: '',
    // Service Specific Fields (initialized as empty/false)
    goal: '',
    hasAssets: 'no',
    copywriting: 'no',
    payment: 'no',
    deadline: '',
    budget: '',
    projectType: '',
    estPages: [],
    sitemap: '',
    domain: 'no',
    blog: 'no',
    ecommerce: 'no',
    specialFeatures: '',
    aiGoal: '',
    aiPlacement: '',
    toolsUsed: '',
    sensitiveData: 'no',
    bottlenecks: '',
    maintenance: 'no',
    backendManage: '',
    adminCount: '',
    adminActions: '',
    roles: '',
    dbPreference: '',
    userTypes: '',
    integrations: '',
    vision: '',
    manualProcess: '',
    frequency: '',
    newTools: 'yes',
    collabType: '',
    collabBring: '',
    collabExpect: '',
    existingClient: 'no',
    projectName: '',
    issueType: '',
    issueDesc: '',
    urgency: 'Normal'
        ,
        designDetails: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const serviceParam = searchParams.get('service');
    
    if (serviceParam) {
      // Map service param names to internal types
      const lower = serviceParam.toLowerCase();
      if (lower.includes('one-page')) setServiceType('one-page');
      else if (lower.includes('multi-page')) setServiceType('multi-page');
      else if (lower.includes('ai assistant') || lower.includes('ai-augmented')) setServiceType('ai-augmented');
      else if (lower.includes('backend')) setServiceType('full-backend'); // Default to full for broad match
      else if (lower.includes('automation')) setServiceType('automation-only');
            else if (lower.includes('graphic') || lower.includes('design') || lower.includes('artwork')) setServiceType('graphic-designs');
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => {
        const currentList = prev[name] || [];
        if (checked) return { ...prev, [name]: [...currentList, value] };
        return { ...prev, [name]: currentList.filter((item: string) => item !== value) };
    });
  };

    const validate = (data: Record<string, any>): Record<string, string> => {
        const e: Record<string, string> = {};
        if (!data.fullName || data.fullName.trim().length < 2) e.fullName = 'Please enter your full name.';
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRe.test(String(data.email).toLowerCase())) e.email = 'Please enter a valid email address.';
        // If a project goal is required for certain services
        if ((serviceType === 'one-page' || serviceType === 'ai-augmented') && !data.goal && !data.aiGoal) {
            e.goal = 'Please provide a short description of your project or goal.';
        }
        return e;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const payload: ContactPayload = {
            serviceType,
            fullName: formData.fullName,
            email: formData.email,
            whatsapp: formData.whatsapp,
            brandName: formData.brandName,
            website: formData.website,
            message: formData.sitemap || formData.aiGoal || formData.goal || formData.issueDesc || '',
            ...formData,
        };

        const validation = validate(payload);
        if (Object.keys(validation).length > 0) {
            setErrors(validation);
            // focus first invalid field for keyboard users
            const first = Object.keys(validation)[0];
            const el = document.getElementById(first);
            if (el) el.focus();
            return;
        }

    try {
      setFormState('submitting');
      const result = await sendContact(payload);
      if (result.success) {
        // PHASE 1: Track conversion in GA4 + GAS
        trackEvent('contact_form_submitted', {
          service_type: serviceType,
          has_phone: !!formData.whatsapp,
          message_length: (formData.sitemap || formData.aiGoal || formData.goal || '').length,
        });
        
        setFormState('success');
        // keep success visible briefly
        setTimeout(() => setFormState('idle'), 5000);
      } else {
        setErrors({ submit: result.message || 'Failed to send. Please try again later.' });
        setFormState('idle');
      }
    } catch (err) {
      setErrors({ submit: 'Unexpected error. Please try again later.' });
      setFormState('idle');
    }
  };  const isCollabOrSupport = serviceType === 'collab' || serviceType === 'support';

  // --- SUB-COMPONENTS FOR FORM SECTIONS ---

  const renderCommonFields = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
            <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Full Name *</label>
            <input id="fullName" type="text" name="fullName" required aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? 'fullName-error' : undefined} value={formData.fullName} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="Jane Doe" />
            {errors.fullName && <p id="fullName-error" className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
        </div>
        <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Email Address *</label>
            <input id="email" type="email" name="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} value={formData.email} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="jane@example.com" />
            {errors.email && <p id="email-error" className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
            <label htmlFor="whatsapp" className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">WhatsApp / Phone</label>
            <input id="whatsapp" type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="+1 (555) 000-0000" />
        </div>
        {/* Only show Brand/Website for non-support/collab if irrelevant, but usually relevant */}
        {!isCollabOrSupport && (
            <div className="space-y-2">
                <label htmlFor="brandName" className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Business / Brand Name</label>
                <input id="brandName" type="text" name="brandName" value={formData.brandName} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="Acme Inc." />
            </div>
        )}
        {serviceType === 'collab' && (
             <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Organization / Brand</label>
                <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="Your Org" />
             </div>
        )}
      </div>

      {!isCollabOrSupport && (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label htmlFor="website" className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Current Website / Socials</label>
                <input id="website" type="text" name="website" value={formData.website} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="instagram.com/brand" />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">How did you hear about us?</label>
                <select name="referral" value={formData.referral} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none">
                    <option value="">Select an option</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="referral">Referral / Friend</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="search">Google Search</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>
      )}
    </div>
  );

  const renderServiceSpecificFields = () => {
    switch (serviceType) {
        case 'one-page':
            return (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">What is this landing page for?</label>
                        <input id="goal" type="text" name="goal" required aria-invalid={!!errors.goal} aria-describedby={errors.goal ? 'goal-error' : undefined} value={formData.goal} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="e.g. Selling a new ebook, booking barbershop appointments..." />
                        {errors.goal && <p id="goal-error" className="text-xs text-red-500 mt-1">{errors.goal}</p>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Do you have brand assets?</label>
                            <select name="hasAssets" value={formData.hasAssets} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none">
                                <option value="no">No, need help creating them</option>
                                <option value="yes">Yes (Logo, colors, photos ready)</option>
                                <option value="partial">Partial (Have some, need some)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Need Copywriting?</label>
                            <select name="copywriting" value={formData.copywriting} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none">
                                <option value="no">No, I have the text</option>
                                <option value="yes">Yes, please write it for me</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Payment Integration?</label>
                         <input type="text" name="payment" value={formData.payment} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="No, or specify: Stripe, PayPal, Wipay..." />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Ideal Launch Date</label>
                            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Approx Budget (USD)</label>
                            <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none">
                                <option value="">Select range</option>
                                <option value="300-500">$300 - $500</option>
                                <option value="500-1000">$500 - $1,000</option>
                                <option value="1000+">$1,000+</option>
                            </select>
                        </div>
                    </div>
                </div>
            );

        case 'multi-page':
            return (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Type of Website</label>
                        <input type="text" name="projectType" required value={formData.projectType} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="e.g. Corporate, Portfolio, Blog, E-commerce..." />
                    </div>
                    
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Pages Needed (Check all that apply)</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {['Home', 'About', 'Services', 'Contact', 'Blog/News', 'Portfolio', 'Shop', 'FAQ', 'Team'].map(page => (
                                <label key={page} className="flex items-center space-x-2 bg-silver-50 dark:bg-navy-900 p-3 rounded-xl border border-gold-400/10 cursor-pointer hover:border-gold-400/40">
                                    <input type="checkbox" name="estPages" value={page} onChange={handleCheckboxChange} checked={formData.estPages?.includes(page)} className="rounded text-gold-500 focus:ring-gold-400 bg-navy-800" />
                                    <span className="text-sm text-navy-800 dark:text-silver-300">{page}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Need E-commerce?</label>
                            <select name="ecommerce" value={formData.ecommerce} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none">
                                <option value="no">No</option>
                                <option value="yes">Yes, online store</option>
                            </select>
                        </div>
                         <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Have Domain & Hosting?</label>
                            <select name="domain" value={formData.domain} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none">
                                <option value="no">No, need guidance</option>
                                <option value="yes">Yes, already purchased</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Special Features / Sitemap</label>
                         <textarea name="sitemap" rows={3} value={formData.sitemap} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="Describe any specific structure or functional requirements..."></textarea>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Ideal Launch Date</label>
                            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Approx Budget (USD)</label>
                            <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none">
                                <option value="">Select range</option>
                                <option value="800-1500">$800 - $1,500</option>
                                <option value="1500-3000">$1,500 - $3,000</option>
                                <option value="3000+">$3,000+</option>
                            </select>
                        </div>
                    </div>
                </div>
            );

        case 'ai-augmented':
            return (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">How should AI help you?</label>
                        <textarea id="aiGoal" name="aiGoal" rows={3} required aria-invalid={!!errors.goal} aria-describedby={errors.goal ? 'goal-error' : undefined} value={formData.aiGoal} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="e.g. Capture leads from chat, answer FAQs about pricing, draft blog posts..."></textarea>
                    </div>
                     <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Where should the AI live?</label>
                            <input type="text" name="aiPlacement" value={formData.aiPlacement} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="e.g. Website Chat Widget, WhatsApp..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Current Tools</label>
                            <input type="text" name="toolsUsed" value={formData.toolsUsed} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="e.g. Notion, Excel, Gmail..." />
                        </div>
                     </div>
                     <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Biggest Business Bottleneck?</label>
                            <input type="text" name="bottlenecks" value={formData.bottlenecks} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="What takes up most of your time?" />
                     </div>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Deadline</label>
                            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Approx Budget (USD)</label>
                            <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none">
                                <option value="">Select range</option>
                                <option value="1500-2500">$1,500 - $2,500</option>
                                <option value="2500-5000">$2,500 - $5,000</option>
                                <option value="5000+">$5,000+</option>
                            </select>
                        </div>
                    </div>
                </div>
            );
        
        case 'partial-backend':
        case 'full-backend':
             return (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Project Type</label>
                        <input type="text" name="projectType" required value={formData.projectType} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="e.g. SaaS MVP, Membership Site, Internal Tool..." />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">User Roles</label>
                            <input type="text" name="userTypes" value={formData.userTypes} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="Admin, Editor, Customer..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Approx. User Count</label>
                            <input type="text" name="adminCount" value={formData.adminCount} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="10, 100, 1000..." />
                        </div>
                    </div>
                    <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Must-Have Features</label>
                         <textarea name="specialFeatures" rows={3} value={formData.specialFeatures} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="Describe the core functionality..."></textarea>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Deadline</label>
                            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Budget Range</label>
                             <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none">
                                <option value="">Select range</option>
                                <option value="2000-4000">$2,000 - $4,000</option>
                                <option value="4000-8000">$4,000 - $8,000</option>
                                <option value="8000+">$8,000+</option>
                            </select>
                        </div>
                    </div>
                </div>
             );

        case 'automation-only':
             return (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">What are you trying to automate?</label>
                        <input id="aiGoal" type="text" name="aiGoal" required aria-invalid={!!errors.goal} aria-describedby={errors.goal ? 'goal-error' : undefined} value={formData.aiGoal} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="e.g. Lead follow-up emails, Data entry..." />
                    </div>
                    <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Describe the current manual process</label>
                         <textarea name="manualProcess" rows={3} value={formData.manualProcess} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="Step 1: I get an email, Step 2: I copy to Excel..."></textarea>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Frequency</label>
                            <input type="text" name="frequency" value={formData.frequency} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="Daily, Weekly, 100x per month..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Current Tools</label>
                            <input type="text" name="toolsUsed" value={formData.toolsUsed} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="Gmail, Sheets, Zapier..." />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Deadline</label>
                            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Budget Range</label>
                             <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none">
                                <option value="">Select range</option>
                                <option value="500-1000">$500 - $1,000</option>
                                <option value="1000-2500">$1,000 - $2,500</option>
                                <option value="2500+">$2,500+</option>
                            </select>
                        </div>
                    </div>
                </div>
             );

        case 'collab':
            return (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Type of Collaboration</label>
                        <select name="collabType" value={formData.collabType} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none">
                                <option value="">Select type</option>
                                <option value="referral">Referral Partnership</option>
                                <option value="white-label">White-Label Development</option>
                                <option value="content">Content Collaboration</option>
                                <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">What do you bring to the table?</label>
                         <textarea name="collabBring" rows={3} value={formData.collabBring} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="Your skills, audience, network..."></textarea>
                    </div>
                    <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">What do you expect from us?</label>
                         <textarea name="collabExpect" rows={3} value={formData.collabExpect} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="Technical execution, AI expertise..."></textarea>
                    </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Links to Portfolio / Socials</label>
                        <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="linkedin.com/in/you" />
                    </div>
                </div>
            );
        
        case 'support':
             return (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Are you an existing client?</label>
                             <select name="existingClient" value={formData.existingClient} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none">
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Urgency</label>
                             <select name="urgency" value={formData.urgency} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none">
                                <option value="Low">Low</option>
                                <option value="Normal">Normal</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical (Site Down)</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Project Name / Website URL</label>
                        <input id="projectName" type="text" name="projectName" required aria-invalid={!!errors.projectName} aria-describedby={errors.projectName ? 'projectName-error' : undefined} value={formData.projectName} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="example.com" />
                        {errors.projectName && <p id="projectName-error" className="text-xs text-red-500 mt-1">{errors.projectName}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Issue Type</label>
                        <select name="issueType" value={formData.issueType} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none">
                            <option value="bug">Bug Report</option>
                            <option value="edit">Content Edit</option>
                            <option value="feature">New Feature</option>
                            <option value="billing">Billing</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Description of Issue / Request</label>
                         <textarea id="issueDesc" name="issueDesc" rows={4} required aria-invalid={!!errors.issueDesc} aria-describedby={errors.issueDesc ? 'issueDesc-error' : undefined} value={formData.issueDesc} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="Please provide as much detail as possible..."></textarea>
                         {errors.issueDesc && <p id="issueDesc-error" className="text-xs text-red-500 mt-1">{errors.issueDesc}</p>}
                    </div>
                </div>
             );

                case 'graphic-designs':
                    return (
                        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">What do you need designed?</label>
                                <textarea id="designDetails" name="designDetails" rows={4} value={formData.designDetails} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="Briefly describe the deliverables, sizes, format, and any brand references..." />
                                <p className="text-xs text-navy-600 dark:text-silver-400 mt-2">Tell me what you need designed (logo, labels, social media pack, flyers, signage, etc.), the size/format, and any existing brand colors or examples you like.</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Preferred Formats / Tools</label>
                                    <input type="text" name="toolsUsed" value={formData.toolsUsed} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none" placeholder="e.g. Figma, Affinity, AI assets, PNG/JPG/PDF (CMYK)" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-navy-600 dark:text-silver-400">Two revision rounds?</label>
                                    <select name="hasAssets" value={formData.hasAssets} onChange={handleChange} className="w-full bg-silver-50 dark:bg-navy-950 border border-gold-400/20 px-4 py-3 text-navy-900 dark:text-white rounded-xl focus:ring-1 focus:ring-gold-400 outline-none">
                                        <option value="no">No, not required</option>
                                        <option value="yes">Yes, include 2 revision rounds</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    );

        default:
            return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO 
        title="Contact | Start a Project with Carai Agency"
        description="Get in touch to discuss your AI-powered web project, automation system, or landing page."
            image={CARAI_OG_IMAGE}
            enableOG={true}
        url="https://carai.agency/contact"
                type="website"
                breadcrumbs={[
                    { name: 'Home', url: 'https://carai.agency' },
                    { name: 'Contact', url: 'https://carai.agency/contact' }
                ]}
      />
      {/* Header Image */}
      <div 
        className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden parallax-bg mb-20"
        style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop")',
        }}
      >
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-silver-300 hover:text-white mb-6 transition-colors font-medium group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Return Home
                </Link>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white shadow-black drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    Get In Touch
                </h1>
                <p className="mt-4 text-xl text-silver-300 max-w-2xl font-light">
                     Let's discuss how we can build something extraordinary together.
                </p>
            </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto bg-white dark:bg-navy-800 border-2 border-gold-400/20 p-8 md:p-16 shadow-2xl rounded-3xl animate-in slide-in-from-bottom-8 duration-700">
          
          <div className="mb-12">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gold-400/20">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-navy-900 dark:text-white">Start a Project</h2>
                        <p className="text-navy-600 dark:text-silver-400 mt-2">Tell us about your goals and we'll build the roadmap.</p>
                    </div>
                    
                    {/* Service Selector */}
                    <div className="relative min-w-[300px]">
                        <label className="text-xs font-bold uppercase tracking-wider text-navy-400 dark:text-silver-500 mb-2 block">I need help with:</label>
                        <div className="relative">
                            <select 
                                value={serviceType} 
                                onChange={(e) => setServiceType(e.target.value as ServiceType)}
                                className="w-full appearance-none bg-silver-50 dark:bg-navy-900 border-2 border-gold-400/30 text-navy-900 dark:text-white pl-4 pr-10 py-3 rounded-xl font-bold focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
                            >
                                {SERVICE_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500 pointer-events-none" />
                        </div>
                    </div>
               </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-16">
            {/* Form Section */}
            <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Common Fields */}
                    {renderCommonFields()}

                    {/* Dynamic Separator */}
                    <div className="relative flex items-center py-4">
                        <div className="flex-grow border-t border-gold-400/20"></div>
                        <span className="flex-shrink-0 mx-4 text-xs font-bold text-gold-500 uppercase tracking-widest">Project Details</span>
                        <div className="flex-grow border-t border-gold-400/20"></div>
                    </div>

                    {/* Specific Fields */}
                    {renderServiceSpecificFields()}

                    <div className="pt-4">
                         <button 
                            type="submit" 
                            disabled={formState !== 'idle'}
                            className={`w-full md:w-auto md:min-w-[200px] flex items-center justify-center gap-2 py-4 px-8 font-bold uppercase tracking-wider text-sm transition-all border rounded-full shadow-lg ${
                                formState === 'success' 
                                ? 'bg-green-600 border-green-600 text-white' 
                                : 'bg-gold-500 border-gold-500 text-navy-900 hover:bg-gold-400 hover:border-gold-400 hover:shadow-gold-500/20'
                            }`}
                        >
                            {formState === 'submitting' ? (
                                "Processing..."
                            ) : formState === 'success' ? (
                                <>Sent Successfully <CheckCircle className="w-5 h-5" /></>
                            ) : (
                                <>Submit Inquiry <Send className="w-4 h-4" /></>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-10 lg:pl-10 lg:border-l border-gold-400/10 h-fit">
                <div>
                    <h3 className="text-lg font-bold text-gold-500 dark:text-gold-400 mb-6 uppercase tracking-wider">Connect Channels</h3>
                    <div className="space-y-4">
                        {SOCIAL_LINKS.map((link) => (
                        <a 
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 text-navy-600 dark:text-silver-300 hover:text-navy-900 dark:hover:text-white transition-colors group"
                        >
                            <div className="p-3 bg-silver-100 dark:bg-navy-900 border border-gold-400/10 group-hover:border-gold-500/50 transition-colors rounded-full">
                                <link.icon className="w-5 h-5 text-navy-700 dark:text-silver-300 group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors" />
                            </div>
                            <span className="font-medium text-lg">{link.label}</span>
                        </a>
                        ))}
                    </div>
                </div>

                <div className="p-8 bg-gradient-to-br from-silver-100 to-white dark:from-navy-900 dark:to-navy-950 border-2 border-gold-400/20 transition-colors rounded-3xl">
                    <h4 className="text-navy-600 dark:text-silver-400 font-medium mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <Mail className="w-4 h-4 text-gold-500" /> Direct Inquiry
                    </h4>
                    <a href={`mailto:${PRIMARY_EMAIL}`} className="text-lg font-bold text-navy-900 dark:text-white hover:text-gold-500 dark:hover:text-gold-400 transition-colors font-display break-all">
                        {PRIMARY_EMAIL}
                    </a>
                </div>

                <div className="bg-navy-900/5 dark:bg-white/5 p-6 rounded-2xl border border-navy-900/10 dark:border-white/10">
                    <div className="flex items-start gap-3">
                         <HelpCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                         <div>
                             <h4 className="font-bold text-sm text-navy-900 dark:text-white mb-1">Not sure what you need?</h4>
                             <p className="text-xs text-navy-600 dark:text-silver-400 leading-relaxed">
                                 Select "Collaboration" or "Customer Support" if none of the project types fit, or just choose the closest one and explain in the notes.
                             </p>
                         </div>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;