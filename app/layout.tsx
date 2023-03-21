import './globals.css';

export const metadata = {
  title: 'Jellie Blog',
  description: 'Jellie의 기술 블로그입니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
