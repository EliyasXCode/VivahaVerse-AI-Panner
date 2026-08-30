import React, { useState } from 'react';
import Modal from '../common/Modal';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { Sparkles, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

const EnquiryModalWizard = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    partner1Name: '',
    partner2Name: '',
    currentCity: '',
    residency: 'Resident',
    weddingDate: '',
    guestCount: 150,
    ceremonyType: 'Hindu',
    numberOfDays: 3,
    preferredDestination: 'Udaipur',
    venueStyle: 'Royal Palace',
    specificVenue: '',
    budgetRange: '₹40–75 lakh',
    contactName: '',
    phone: '',
    email: '',
    whatsappPreference: true,
    bestTimeToContact: 'Evening (5 PM - 8 PM)',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await API.post('/inquiries', formData);
      if (res.data.success) {
        setSubmitted(true);
        toast.success('Inquiry submitted successfully!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Luxury Wedding Enquiry" maxWidth="max-w-xl">
      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-16 h-16 bg-wine text-gold rounded-full flex items-center justify-center mx-auto shadow-gold-glow">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-wine">Enquiry Received</h3>
          <p className="text-xs text-charcoal-muted max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-charcoal">{formData.partner1Name || 'Couples'}</strong>! Our senior destination wedding architect will contact you on <strong className="text-wine">{formData.phone}</strong> within 24 hours with custom venue proposals.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              onClose();
            }}
            className="mt-4 bg-gold text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-wine transition-colors"
          >
            Back to VivahaVerse
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* Step Progress Bar */}
          <div className="flex items-center justify-between text-[11px] text-charcoal-muted pb-2 border-b border-gold/20">
            <span>Step {step} of 5</span>
            <span className="font-serif font-bold text-wine">
              {step === 1 && "Couple Details"}
              {step === 2 && "Celebration Scale"}
              {step === 3 && "Destination Preference"}
              {step === 4 && "Budget Tier"}
              {step === 5 && "Contact Details"}
            </span>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Bride / Partner 1 Name *</label>
                  <input
                    type="text"
                    name="partner1Name"
                    required
                    value={formData.partner1Name}
                    onChange={handleChange}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Groom / Partner 2 Name *</label>
                  <input
                    type="text"
                    name="partner2Name"
                    required
                    value={formData.partner2Name}
                    onChange={handleChange}
                    placeholder="e.g. Kabir Mehta"
                    className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Current Residence City *</label>
                <input
                  type="text"
                  name="currentCity"
                  required
                  value={formData.currentCity}
                  onChange={handleChange}
                  placeholder="e.g. New Delhi / London / Dubai"
                  className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Residency Status</label>
                <div className="flex space-x-4 pt-1">
                  {['Resident', 'NRI', 'International'].map((r) => (
                    <label key={r} className="flex items-center space-x-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="residency"
                        value={r}
                        checked={formData.residency === r}
                        onChange={handleChange}
                        className="text-wine focus:ring-wine"
                      />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Tentative Wedding Date / Month</label>
                  <input
                    type="text"
                    name="weddingDate"
                    value={formData.weddingDate}
                    onChange={handleChange}
                    placeholder="e.g. Nov 2026 or Dec 2026"
                    className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Total Guest Count *</label>
                  <input
                    type="number"
                    name="guestCount"
                    required
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Ceremony Tradition</label>
                  <select
                    name="ceremonyType"
                    value={formData.ceremonyType}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
                  >
                    <option value="Hindu">Hindu Royal Wedding</option>
                    <option value="Sikh">Sikh Anand Karaj</option>
                    <option value="Muslim">Muslim Nikah & Walima</option>
                    <option value="Christian">Christian Seaside Wedding</option>
                    <option value="Interfaith">Interfaith Celebration</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Number of Days</label>
                  <select
                    name="numberOfDays"
                    value={formData.numberOfDays}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
                  >
                    <option value={2}>2 Days (Intimate)</option>
                    <option value={3}>3 Days (Classic)</option>
                    <option value={4}>4 Days (Grand Regal)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block font-semibold mb-1">Preferred Destination *</label>
                <select
                  name="preferredDestination"
                  value={formData.preferredDestination}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
                >
                  <option value="Udaipur">Udaipur, Rajasthan</option>
                  <option value="Jaipur">Jaipur, Rajasthan</option>
                  <option value="South Goa">South Goa</option>
                  <option value="Jaisalmer">Jaisalmer, Rajasthan</option>
                  <option value="Kumarakom">Kumarakom / Kerala</option>
                  <option value="Rishikesh">Rishikesh, Uttarakhand</option>
                  <option value="Mussoorie">Mussoorie, Uttarakhand</option>
                  <option value="Jim Corbett">Jim Corbett National Park</option>
                  <option value="Andaman">Andaman Islands</option>
                  <option value="Open to AI Advice">Open to AI Recommender</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Venue Style Preference</label>
                <select
                  name="venueStyle"
                  value={formData.venueStyle}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
                >
                  <option value="Royal Palace">Royal Lake / City Palace</option>
                  <option value="Heritage Fort">Heritage Sandstone Fort</option>
                  <option value="Beach Resort">5-Star Seaside Beach Resort</option>
                  <option value="Backwater Lawn">Backwater Kerala Lawn</option>
                  <option value="Mountain Retreat">Himalayan Mountain Retreat</option>
                  <option value="Forest Wilderness">Riverside Forest Resort</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Specific Venue Name (Optional)</label>
                <input
                  type="text"
                  name="specificVenue"
                  value={formData.specificVenue}
                  onChange={handleChange}
                  placeholder="e.g. Leela Palace / Taj Exotica"
                  className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
                />
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <label className="block font-semibold mb-1">Total Estimated Budget Range *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  '₹20–35 lakh',
                  '₹35–50 lakh',
                  '₹50–75 lakh',
                  '₹75 lakh–₹1.2 crore',
                  '₹1.2 crore – ₹2 crore',
                  '₹2 crore+'
                ].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setFormData({ ...formData, budgetRange: b })}
                    className={`p-3 rounded-xl border text-left font-medium transition-all ${
                      formData.budgetRange === b
                        ? 'border-wine bg-wine text-white shadow-md'
                        : 'border-gold/30 bg-white text-charcoal hover:border-gold'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-charcoal-muted italic">
                Note: Indicative estimated costs cover venue, guest room blocks, catering, decor, and entertainment.
              </p>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block font-semibold mb-1">Primary Contact Person Name *</label>
                <input
                  type="text"
                  name="contactName"
                  required
                  value={formData.contactName || formData.partner1Name}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Additional Requirements / Vision</label>
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mention any special requests (e.g. Jain catering, elderly accessibility, helicam permits)..."
                  className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
                />
              </div>
            </div>
          )}

          {/* Wizard Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-gold/20">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center space-x-1 text-charcoal hover:text-wine font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="bg-wine text-gold px-5 py-2 rounded-full font-semibold hover:bg-wine-dark flex items-center space-x-1"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="bg-gold text-white px-6 py-2.5 rounded-full font-semibold hover:bg-wine shadow-lg flex items-center space-x-1"
              >
                <Sparkles className="w-4 h-4" />
                <span>{submitting ? 'Submitting...' : 'Submit Wedding Inquiry'}</span>
              </button>
            )}
          </div>

        </form>
      )}
    </Modal>
  );
};

export default EnquiryModalWizard;
