
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

interface QRCodeGeneratorProps {
  url: string;
  title: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean;
  downloadable?: boolean;
}

export const QRCodeGenerator = ({
  url,
  title,
  size = 128,
  bgColor = '#ffffff',
  fgColor = '#000000',
  level = 'L',
  includeMargin = true,
  downloadable = true,
}: QRCodeGeneratorProps) => {
  // Function to handle QR code download
  const downloadQRCode = () => {
    const canvas = document.getElementById(`qr-canvas-${title.replace(/\s+/g, '-')}`) as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${title.replace(/\s+/g, '-')}-qrcode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;

  return (
    <Card className="w-full max-w-[250px]">
      <CardHeader>
        <CardTitle className="text-center text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center pb-2">
        <QRCodeSVG
          id={`qr-gen-${title.replace(/\s+/g, '-')}`}
          value={fullUrl}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level={level}
          includeMargin={includeMargin}
        />
        {/* Hidden canvas for download functionality */}
        <canvas 
          id={`qr-canvas-${title.replace(/\s+/g, '-')}`}
          style={{ display: 'none' }}
        />
      </CardContent>
      {downloadable && (
        <CardFooter className="pt-0 flex justify-center">
          <button 
            onClick={downloadQRCode}
            className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Download
          </button>
        </CardFooter>
      )}
    </Card>
  );
};
