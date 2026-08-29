import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioSection } from './components/PortfolioSection';
import { InteractiveTriage } from './components/InteractiveTriage';
import { BookingWizard } from './components/BookingWizard';
import { RepairTracker } from './components/RepairTracker';
import { PricingCalculator } from './components/PricingCalculator';
import { LabShowcase } from './components/LabShowcase';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import { INITIAL_DEMO_TRACKING_TICKETS } from './data/portfolioData';
import { BookingRequest } from './types/repair';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('portfolio');
  
  // Storage of tracking tickets (Preloaded + User Created)
  const [tickets, setTickets] = useState<Record<string, BookingRequest>>(() => {
    try {
      const saved = localStorage.getItem('rulicomputer_repair_tickets');
      if (saved) {
        return { ...INITIAL_DEMO_TRACKING_TICKETS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load tickets from local storage', e);
    }
    return INITIAL_DEMO_TRACKING_TICKETS;
  });

  const [activeTrackingTicketId, setActiveTrackingTicketId] = useState<string>('RC-8402');

  // Booking Form Prefill States
  const [bookingPrefill, setBookingPrefill] = useState<{
    gpuModel?: string;
    brand?: string;
    symptom?: string;
  }>({});

  // Synchronize tickets to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rulicomputer_repair_tickets', JSON.stringify(tickets));
    } catch (e) {
      console.error('Failed to save tickets to local storage', e);
    }
  }, [tickets]);

  // Handler when user submits a new booking in wizard
  const handleBookingComplete = (newTicket: BookingRequest) => {
    setTickets(prev => ({
      ...prev,
      [newTicket.ticketId]: newTicket
    }));
    setActiveTrackingTicketId(newTicket.ticketId);
    // Switch to tracker tab
    setActiveTab('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick track from navbar or footer
  const handleQuickTrack = (ticketId: string) => {
    setActiveTrackingTicketId(ticketId);
    setActiveTab('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Prefill booking from portfolio or triage
  const handlePrefillBooking = (gpuModel?: string, brand?: string, symptom?: string) => {
    setBookingPrefill({ gpuModel, brand, symptom });
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-red-500/30 selection:text-red-200">
      
      {/* Top Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onQuickTrack={handleQuickTrack}
        bookingCount={Object.keys(tickets).length}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* If on portfolio or home tab, render full showcase suite */}
        {activeTab === 'portfolio' && (
          <>
            <Hero
              onBookClick={() => {
                setBookingPrefill({});
                setActiveTab('booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreProjects={() => {
                const el = document.getElementById('portfolio-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onTriageClick={() => {
                setActiveTab('triage');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <PortfolioSection
              onSelectForBooking={(model, brand, symp) => handlePrefillBooking(model, brand, symp)}
            />

            <InteractiveTriage
              onSelectComponentForBooking={(symp) => handlePrefillBooking(undefined, undefined, symp)}
            />

            <PricingCalculator
              onStartBooking={() => {
                setBookingPrefill({});
                setActiveTab('booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <LabShowcase />

            <CustomerReviews />
          </>
        )}

        {/* Dedicated PCB Diagnostic Triage Tab */}
        {activeTab === 'triage' && (
          <div className="pt-6">
            <InteractiveTriage
              onSelectComponentForBooking={(symp) => handlePrefillBooking(undefined, undefined, symp)}
            />
            <PricingCalculator
              onStartBooking={() => {
                setBookingPrefill({});
                setActiveTab('booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* Dedicated Booking Wizard Tab */}
        {activeTab === 'booking' && (
          <div className="pt-6">
            <BookingWizard
              prefillGpuModel={bookingPrefill.gpuModel}
              prefillBrand={bookingPrefill.brand}
              prefillSymptom={bookingPrefill.symptom}
              onBookingComplete={handleBookingComplete}
            />
          </div>
        )}

        {/* Dedicated Live Ticket Tracker Tab */}
        {activeTab === 'tracker' && (
          <div className="pt-6">
            <RepairTracker
              tickets={tickets}
              initialTicketId={activeTrackingTicketId}
              onOpenBooking={() => {
                setBookingPrefill({});
                setActiveTab('booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* Dedicated Pricing & Guarantee Tab */}
        {activeTab === 'pricing' && (
          <div className="pt-6">
            <PricingCalculator
              onStartBooking={() => {
                setBookingPrefill({});
                setActiveTab('booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <CustomerReviews />
          </div>
        )}

        {/* Dedicated Lab & Gear Specs Tab */}
        {activeTab === 'lab' && (
          <div className="pt-6">
            <LabShowcase />
            <CustomerReviews />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
