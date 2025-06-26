import './globals.css';
import ReduxProvider from '@/redux/provider';

export const metadata = {
  title: 'Your App',
  description: 'Your description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
