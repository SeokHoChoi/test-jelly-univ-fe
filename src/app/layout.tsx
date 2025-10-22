import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jelly University - 반려동물 맞춤 식단 솔루션",
  description: "서울대·한국수의영양학회 임원 수의사가 검증한 반려동물 맞춤 식단 솔루션",
  icons: {
    icon: '/img/jellyu-logo.png',
    shortcut: '/img/jellyu-logo.png',
    apple: '/img/jellyu-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3QZFGDB14S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3QZFGDB14S');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '4182182545371999');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=4182182545371999&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Hotjar Tracking Code (Content Square) */}
        <Script
          src="https://t.contentsquare.net/uxa/6d9d3510da5a8.js"
          strategy="afterInteractive"
        />

        {/* Channel Talk */}
        <Script
          id="channel-talk"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var w = window;
                if (w.ChannelIO) {
                  return w.console.error("ChannelIO script included twice.");
                }
                var ch = function() {
                  ch.c(arguments);
                };
                ch.q = [];
                ch.c = function(args) {
                  ch.q.push(args);
                };
                w.ChannelIO = ch;
                function l() {
                  if (w.ChannelIOInitialized) {
                    return;
                  }
                  w.ChannelIOInitialized = true;
                  var s = document.createElement("script");
                  s.type = "text/javascript";
                  s.async = true;
                  s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
                  var x = document.getElementsByTagName("script")[0];
                  if (x.parentNode) {
                    x.parentNode.insertBefore(s, x);
                  }
                }
                if (document.readyState === "complete") {
                  l();
                } else {
                  w.addEventListener("DOMContentLoaded", l);
                  w.addEventListener("load", l);
                }
              })();

              ChannelIO('boot', {
                "pluginKey": "35e9c103-78c8-4c3e-98fe-28d1c2fe43c6"
              });
            `,
          }}
        />

        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
