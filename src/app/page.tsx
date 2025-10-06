import { getAllLandmarks } from "@/lib/cms";
import LandmarksExplorer from "@/components/LandmarksExplorer";

export default function Home() {
  const items = getAllLandmarks();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sand-50 via-sand-100 to-sand-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
        <div className="container relative py-20 sm:py-32">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <div className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent-700 dark:text-accent text-sm font-medium mb-4">
              🌍 Virtual Tour Experience
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-brand-900 via-brand-700 to-accent bg-clip-text text-transparent dark:from-white dark:via-sand-100 dark:to-accent">
                Ascend Windhoek
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Experience Windhoek&apos;s most iconic landmarks through immersive 3D models and 360° virtual tours. Explore Christuskirche, Heroes&apos; Acre, and the City Museum from anywhere in the world.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a href="#landmarks" className="btn-primary text-base px-8 py-3">
                Start Exploring
              </a>
              <a href="#about" className="px-8 py-3 rounded-full border-2 border-black/10 dark:border-white/20 hover:border-accent dark:hover:border-accent transition-all duration-300 font-medium">
                Learn More
              </a>
            </div>
            
            {/* Feature badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-muted-700 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                <span>360° Tours</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                </svg>
                <span>Interactive 3D</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span>Maps & Info</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-sand-50 dark:fill-slate-950"/>
          </svg>
        </div>
      </section>

      {/* Landmarks Grid */}
      <section id="landmarks" className="section bg-sand-50 dark:bg-slate-950 transition-colors duration-500">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              Discover Iconic <span className="text-accent">Landmarks</span>
            </h2>
            <p className="text-muted-700 dark:text-slate-400 max-w-2xl mx-auto">
              Explore {items.length} magnificent landmarks that define Windhoek&apos;s rich history and culture
            </p>
          </div>
          <LandmarksExplorer items={items} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section bg-white dark:bg-slate-900 transition-colors duration-500">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  About This <span className="text-accent">Project</span>
                </h2>
                <p className="text-muted-700 dark:text-slate-400 leading-relaxed">
                  This interactive virtual tour showcases Windhoek&apos;s most significant landmarks using cutting-edge 3D visualization and 360° photography. Built as a final year research project, it demonstrates the power of modern web technologies in cultural preservation and tourism.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Interactive 3D Models</h3>
                      <p className="text-sm text-muted-700 dark:text-slate-400">Rotate, zoom, and explore detailed exterior models</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">360° Virtual Tours</h3>
                      <p className="text-sm text-muted-700 dark:text-slate-400">Step inside with immersive panoramic views</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Rich Information</h3>
                      <p className="text-sm text-muted-700 dark:text-slate-400">Historical facts, maps, and visitor details</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-black/5 dark:ring-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-brand-900/20 dark:from-accent/30 dark:to-brand-700/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                      <svg className="w-12 h-12 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                      </svg>
                    </div>
                    <div className="text-4xl font-bold text-white">3</div>
                    <div className="text-white/90 font-medium">Landmarks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-accent/5 to-brand-900/5 dark:from-accent/10 dark:to-brand-700/10 transition-colors duration-500">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6 p-12 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-xl ring-2 ring-black/5 dark:ring-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to Explore?
            </h2>
            <p className="text-muted-700 dark:text-slate-400 max-w-2xl mx-auto">
              Start your virtual journey through Windhoek&apos;s most iconic landmarks. Experience history, culture, and architecture like never before.
            </p>
            <a href="#landmarks" className="btn-primary text-base px-8 py-3 inline-block">
              Begin Your Tour
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
