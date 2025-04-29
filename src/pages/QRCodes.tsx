
import React from 'react';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';

const QRCodes = () => {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-6 text-center">
            QR Codes
          </h1>
          <p className="text-xl text-muted-foreground mb-12 text-center">
            Scan these QR codes to quickly access our website on your mobile device.
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            <QRCodeGenerator 
              url="/" 
              title="Home Page"
              size={200}
            />
            <QRCodeGenerator 
              url="/contact" 
              title="Contact Page"
              size={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodes;
