export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ padding: 20 }}>
        <nav style={{ marginBottom: 20 }}>
          <a href="/">Home</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
