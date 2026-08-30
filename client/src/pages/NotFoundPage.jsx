import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen pt-32 text-center bg-background-cream space-y-4 px-4">
      <Compass className="w-12 h-12 text-gold mx-auto animate-spin" />
      <h1 className="font-serif text-4xl sm:text-6xl font-bold text-wine">404 — Destination Not Found</h1>
      <p className="text-xs text-charcoal-muted max-w-md mx-auto">
        The wedding page or destination you are searching for has moved or does not exist.
      </p>
      <Link
        to="/"
        className="bg-wine text-gold px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-block hover:bg-wine-dark"
      >
        Return to Home Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
