<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Andrei Besañez - Portfolio</title>
    <link rel="icon" type="image/png" href="{{ asset('images/profile.png') }}">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Icons (Lucide) -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    
    <style>
        body { font-family: 'Inter', sans-serif; }
        
        /* View Transitions for Theme Toggle */
        ::view-transition-old(root),
        ::view-transition-new(root) {
            animation: none;
            mix-blend-mode: normal;
        }

        /* When switching TO light (html is NOT .dark): 
           The OLD state is Dark, the NEW state is Light.
           We want the Dark state on top so it can shrink away. */
        ::view-transition-old(root) { z-index: 2; }
        ::view-transition-new(root) { z-index: 1; }

        /* When switching TO dark (html IS .dark):
           The OLD state is Light, the NEW state is Dark.
           We want the Dark state on top so it can expand. */
        .dark::view-transition-old(root) { z-index: 1; }
        .dark::view-transition-new(root) { z-index: 2; }

        /* Hide scrollbar for horizontal swipeable areas */
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
    
    <!-- Theme Script to avoid flash on load -->
    <script>
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    </script>
</head>
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 antialiased selection:bg-blue-200 selection:text-blue-900 transition-colors duration-300 flex flex-col lg:flex-row min-h-screen">

    <!-- Mobile Header -->
    <div class="lg:hidden flex items-center justify-between p-5 bg-white dark:bg-[#060913] border-b border-slate-200 dark:border-slate-800/50 sticky top-0 z-40 transition-colors duration-300">
        <div class="font-bold text-2xl tracking-tighter">{{ substr(config('portfolio.personal.initials'), 0, 1) }}<span class="text-blue-500">{{ substr(config('portfolio.personal.initials'), 1) }}</span></div>
        <button id="mobile-menu-btn" class="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <i data-lucide="menu" class="w-6 h-6"></i>
        </button>
    </div>

    <!-- Mobile Backdrop -->
    <div id="mobile-backdrop" class="fixed inset-0 bg-slate-900/20 dark:bg-black/50 z-40 lg:hidden opacity-0 pointer-events-none transition-opacity duration-300 backdrop-blur-sm"></div>

    <!-- Sidebar Navigation -->
    <aside id="sidebar" class="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-[#060913] text-slate-900 dark:text-white flex flex-col justify-between py-10 px-6 border-r border-slate-200 dark:border-slate-800/50 z-50 transition-transform duration-300 -translate-x-full lg:translate-x-0 overflow-y-auto">
        <!-- Close Button (Mobile only) -->
        <button id="close-sidebar-btn" class="lg:hidden absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <i data-lucide="x" class="w-5 h-5"></i>
        </button>
        <div>
            <!-- Logo / Brand -->
            <div class="mb-12">
                <div class="flex items-center gap-2 mb-4">
                    <div class="font-bold text-3xl tracking-tighter">{{ substr(config('portfolio.personal.initials'), 0, 1) }}<span class="text-blue-500">{{ substr(config('portfolio.personal.initials'), 1) }}</span></div>
                    <div class="h-2 w-2 rounded-full bg-blue-500 ml-auto"></div>
                </div>
                <h1 class="font-semibold text-lg">{{ config('portfolio.personal.name') }}</h1>
                <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">{!! nl2br(e(str_replace(' & ', " &\n", config('portfolio.personal.role')))) !!}</p>
            </div>

            <!-- Nav Links -->
            <nav class="flex flex-col space-y-2">
                <a href="/" class="flex items-center gap-4 transition-colors font-medium py-3 pl-4 -ml-6 pr-6 {{ request()->is('/') ? 'text-blue-600 dark:text-blue-500 border-l-2 border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-slate-800/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-l-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-transparent' }}">
                    <i data-lucide="home" class="w-5 h-5"></i> Home
                </a>
                <a href="/about" class="flex items-center gap-4 transition-colors font-medium py-3 pl-4 -ml-6 pr-6 {{ request()->is('about') ? 'text-blue-600 dark:text-blue-500 border-l-2 border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-slate-800/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-l-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-transparent' }}">
                    <i data-lucide="user" class="w-5 h-5"></i> About
                </a>
                <a href="/projects" class="flex items-center gap-4 transition-colors font-medium py-3 pl-4 -ml-6 pr-6 {{ request()->is('projects') ? 'text-blue-600 dark:text-blue-500 border-l-2 border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-slate-800/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-l-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-transparent' }}">
                    <i data-lucide="folder" class="w-5 h-5"></i> Projects
                </a>
                <a href="/skills" class="flex items-center gap-4 transition-colors font-medium py-3 pl-4 -ml-6 pr-6 {{ request()->is('skills') ? 'text-blue-600 dark:text-blue-500 border-l-2 border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-slate-800/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-l-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-transparent' }}">
                    <i data-lucide="code" class="w-5 h-5"></i> Skills
                </a>
                <a href="/experience" class="flex items-center gap-4 transition-colors font-medium py-3 pl-4 -ml-6 pr-6 {{ request()->is('experience') ? 'text-blue-600 dark:text-blue-500 border-l-2 border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-slate-800/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-l-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-transparent' }}">
                    <i data-lucide="briefcase" class="w-5 h-5"></i> Experience
                </a>
                <a href="/contact" class="flex items-center gap-4 transition-colors font-medium py-3 pl-4 -ml-6 pr-6 {{ request()->is('contact') ? 'text-blue-600 dark:text-blue-500 border-l-2 border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-slate-800/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-l-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-transparent' }}">
                    <i data-lucide="mail" class="w-5 h-5"></i> Contact
                </a>
            </nav>
        </div>

        <div>
            <!-- Socials & Resume -->
            <div class="mb-8">
                <p class="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-4 tracking-widest">LET'S CONNECT</p>
                <div class="flex gap-3 mb-6">
                    <a href="{{ config('portfolio.socials.github.url') }}" target="_blank" class="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
                    </a>
                    <a href="{{ config('portfolio.socials.facebook.url') }}" target="_blank" class="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href="mailto:{{ config('portfolio.personal.email') }}" class="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"><i data-lucide="mail" class="w-4 h-4"></i></a>
                </div>
                <a href="{{ config('portfolio.personal.resume_link') }}" target="_blank" class="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/20 transition-all text-sm font-medium">
                    <i data-lucide="download" class="w-4 h-4"></i> Download Resume
                </a>
            </div>

            <!-- Footer info -->
            <div class="text-[11px] text-slate-400 dark:text-slate-500 mb-4">
                <p>&copy; {{ date('Y') }} {{ config('portfolio.personal.name') }}</p>
                <p>All rights reserved.</p>
            </div>
            
            <button id="theme-toggle" class="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer w-full p-2 -ml-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <i data-lucide="moon" id="theme-icon" class="w-4 h-4"></i> <span id="theme-text">Dark Mode</span>
            </button>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="lg:ml-64 flex-1 relative min-h-screen">
        {{ $slot }}
    </main>

    <!-- Initialize Lucide Icons & Theme Logic -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        lucide.createIcons();
        AOS.init({
            once: true,
            offset: 50,
            duration: 800,
            easing: 'ease-out-cubic',
        });

        // Sidebar Toggle Logic
        const sidebar = document.getElementById('sidebar');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const closeSidebarBtn = document.getElementById('close-sidebar-btn');
        const mobileBackdrop = document.getElementById('mobile-backdrop');

        function toggleSidebar() {
            const isClosed = sidebar.classList.contains('-translate-x-full');
            if (isClosed) {
                sidebar.classList.remove('-translate-x-full');
                mobileBackdrop.classList.remove('opacity-0', 'pointer-events-none');
                mobileBackdrop.classList.add('opacity-100', 'pointer-events-auto');
                document.body.classList.add('overflow-hidden'); // Prevent scrolling
            } else {
                sidebar.classList.add('-translate-x-full');
                mobileBackdrop.classList.add('opacity-0', 'pointer-events-none');
                mobileBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
                document.body.classList.remove('overflow-hidden');
            }
        }

        if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleSidebar);
        if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', toggleSidebar);
        if (mobileBackdrop) mobileBackdrop.addEventListener('click', toggleSidebar);

        // Theme Toggle Logic
        const themeToggleBtn = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const themeText = document.getElementById('theme-text');

        // Initial setup for the button based on current theme
        if (document.documentElement.classList.contains('dark')) {
            themeIcon.setAttribute('data-lucide', 'sun');
            themeText.textContent = 'Light Mode';
            lucide.createIcons();
        }

        themeToggleBtn.addEventListener('click', async (e) => {
            const toggleTheme = () => {
                document.documentElement.classList.toggle('dark');
                const isDark = document.documentElement.classList.contains('dark');
                
                // Update Local Storage
                localStorage.theme = isDark ? 'dark' : 'light';
                
                // Update Button
                themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
                themeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
                lucide.createIcons();
            };

            // If browser supports View Transitions API
            if (document.startViewTransition) {
                // Determine origin of expansion (click position)
                const x = e.clientX || innerWidth / 2;
                const y = e.clientY || innerHeight / 2;

                const transition = document.startViewTransition(toggleTheme);

                transition.ready.then(() => {
                    const radius = Math.hypot(
                        Math.max(x, innerWidth - x),
                        Math.max(y, innerHeight - y)
                    );
                    
                    const isDarkAfter = document.documentElement.classList.contains('dark');
                    
                    const clipPath = [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${radius}px at ${x}px ${y}px)`
                    ];
                    
                    // If going TO dark, the dark state (new) expands.
                    // If going TO light, the dark state (old) shrinks.
                    document.documentElement.animate(
                        {
                            clipPath: isDarkAfter ? clipPath : [...clipPath].reverse()
                        },
                        {
                            duration: 500,
                            easing: 'ease-in-out',
                            pseudoElement: isDarkAfter ? '::view-transition-new(root)' : '::view-transition-old(root)'
                        }
                    );
                });
            } else {
                // Fallback for browsers without View Transition API
                toggleTheme();
            }
        });
    </script>
</body>
</html>
