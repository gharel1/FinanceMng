import './globals.css';

export const metadata = {
  title: 'Multipool — מרכז פיננסי',
  description: 'לוח בקרה פיננסי לניהול מרכז השחייה Multipool — הוצאות, הכנסות, דוחות והמלצות CFO',
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
