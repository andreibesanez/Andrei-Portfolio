<x-layout>
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center pt-12 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative overflow-hidden">
        <!-- Decorative dots -->
        <div class="absolute right-20 top-32 opacity-20 pointer-events-none" data-aos="fade-in" data-aos-duration="1500">
            <div class="grid grid-cols-5 gap-3">
                @for($i=0; $i<25; $i++)
                <div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                @endfor
            </div>
        </div>

        <div class="w-full flex flex-col lg:flex-row items-center gap-12">
            <!-- Text Content -->
            <div class="flex-1 space-y-4 md:space-y-6 z-10">
                <div class="flex items-center gap-3" data-aos="fade-down">
                    <span class="text-blue-600 font-semibold tracking-wide text-sm md:text-base">Hello, I'm</span>
                    <div class="h-px w-8 md:w-12 bg-blue-200"></div>
                </div>
                
                <h1 class="text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight transition-colors" data-aos="fade-up" data-aos-delay="100">
                    {{ config('portfolio.personal.name') }}
                </h1>
                
                <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-600 dark:text-blue-500 mt-2 transition-colors" data-aos="fade-up" data-aos-delay="150">
                    {{ config('portfolio.personal.role') }}
                </h2>
                
                <p class="text-slate-500 dark:text-slate-400 text-base lg:text-lg max-w-lg leading-relaxed mt-4 md:mt-6 transition-colors" data-aos="fade-up" data-aos-delay="200">
                    {{ config('portfolio.personal.bio') }}
                </p>
                
                <div class="flex flex-col sm:flex-row items-center gap-4 pt-6 w-full sm:w-auto" data-aos="fade-up" data-aos-delay="300">
                    <a href="/projects" class="flex-1 sm:flex-none justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:px-8 sm:py-3.5 rounded-lg text-sm sm:text-base font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap">
                        View My Work <i data-lucide="arrow-right" class="w-3 h-3 sm:w-4 sm:h-4"></i>
                    </a>
                    <a href="/contact" class="flex-1 sm:flex-none text-center bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-4 py-3 sm:px-8 sm:py-3.5 rounded-lg text-sm sm:text-base font-medium transition-all shadow-sm whitespace-nowrap">
                        Contact Me
                    </a>
                </div>
            </div>
            
            <!-- Hero Image -->
            <div class="flex-1 relative flex justify-end">
                <!-- Background blob/shape -->
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-2xl opacity-70 transition-colors"></div>
                
                <!-- Seamless Blended Image -->
                <img src="{{ asset('images/profile.png') }}" alt="{{ config('portfolio.personal.name') }}" class="relative z-10 w-[90%] lg:max-w-md h-auto object-contain">
            </div>
        </div>
    </section>
</x-layout>
