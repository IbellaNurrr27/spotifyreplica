export default function Footer() {
  return (
    <footer className="bg-black text-muted-foreground py-16 px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-foreground font-heading font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Jobs</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">For the Record</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-heading font-bold mb-4">Communities</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-foreground transition-colors">For Artists</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Developers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Advertising</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Investors</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Vendors</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-heading font-bold mb-4">Useful links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Mobile App</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-heading font-bold mb-4">Plans</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-foreground transition-colors">Premium</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Free</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-sm">© 2026 spotify.com</p>
        </div>
      </div>
    </footer>
  );
}
