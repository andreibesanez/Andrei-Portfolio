<x-layout>
    <div class="max-w-7xl mx-auto pb-24">
        <!-- Experience Hero Section -->
        <section class="pt-20 pb-16 px-6 md:px-12 lg:px-24 relative" data-aos="fade-up">
            <div class="absolute right-20 top-20 opacity-20 pointer-events-none">
                <div class="grid grid-cols-4 gap-3">
                    @for($i=0; $i<16; $i++)
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                    @endfor
                </div>
            </div>

            <div class="max-w-2xl z-10 relative">
                <div class="flex items-center gap-3 mb-4">
                    <span class="text-blue-600 dark:text-blue-500 font-semibold text-sm tracking-wide transition-colors">My Journey</span>
                    <div class="h-px w-12 bg-blue-200 dark:bg-blue-800 transition-colors"></div>
                </div>
                
                <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 md:mb-6 transition-colors">
                    Professional Experience
                </h1>
                
                <p class="text-slate-500 dark:text-slate-400 text-base leading-relaxed transition-colors">
                    A timeline of my academic and professional journey, showcasing the roles I've taken and the impact I've made along the way.
                </p>
                
                <div class="mt-8">
                    <a href="{{ config('portfolio.personal.resume_link') }}" target="_blank" class="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all text-sm font-medium shadow-sm">
                        <i data-lucide="download" class="w-4 h-4 text-blue-600 dark:text-blue-400"></i> Download Full Resume
                    </a>
                </div>
            </div>
        </section>

        <div class="w-full h-px bg-slate-100 dark:bg-slate-800/50 mb-16 transition-colors"></div>

        <!-- Experience Timeline -->
        <section class="px-6 md:px-12 lg:px-24 mb-24">
            <div class="relative max-w-4xl mx-auto">
                <!-- Vertical Line -->
                <div class="absolute left-[27px] lg:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block transition-colors"></div>
                <!-- Vertical line for mobile -->
                <div class="absolute left-[27px] top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2 md:hidden transition-colors"></div>

                <div class="space-y-12">
                    
                    @foreach(config('portfolio.experience') as $index => $job)
                    <!-- Experience Item -->
                    <div class="relative flex flex-col md:flex-row items-start justify-between {{ $index % 2 != 0 ? 'md:flex-row-reverse' : '' }} group" data-aos="fade-up" data-aos-delay="{{ $index * 100 }}">
                        <!-- Dot -->
                        <div class="absolute left-[27px] md:left-1/2 top-6 w-4 h-4 bg-white dark:bg-slate-900 border-4 {{ $job['dot_color'] }} rounded-full -translate-x-1/2 z-10 shadow-[0_0_0_4px_white] dark:shadow-[0_0_0_4px_#0f172a] group-hover:scale-125 transition-transform"></div>
                        
                        <!-- Side 1 (Date & Company for Desktop) -->
                        <div class="md:w-[45%] text-left {{ $index % 2 == 0 ? 'md:text-right pr-0 md:pr-12 pl-[60px] md:pl-0' : 'pl-[60px] md:pl-12' }} pt-5 md:pt-4 mb-4 md:mb-0">
                            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-1 hidden md:block transition-colors">{{ $job['title'] }}</h3>
                            <h4 class="text-blue-600 dark:text-blue-400 font-medium text-sm hidden md:block transition-colors">{{ $job['company'] }}</h4>
                            <div class="flex items-center {{ $index % 2 == 0 ? 'md:justify-end' : '' }} gap-2 text-slate-400 dark:text-slate-500 text-xs mt-2 md:mt-3 transition-colors">
                                <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                                <span>{{ $job['duration'] }}</span>
                            </div>
                        </div>

                        <!-- Side 2 (Content) -->
                        <div class="md:w-[45%] {{ $index % 2 == 0 ? 'pl-[60px] md:pl-12' : 'pl-[60px] md:pl-0 md:pr-12' }} pt-0 md:pt-4">
                            <!-- Mobile Title -->
                            <div class="md:hidden mb-3">
                                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-1 transition-colors">{{ $job['title'] }}</h3>
                                <h4 class="text-blue-600 dark:text-blue-400 font-medium text-sm transition-colors">{{ $job['company'] }}</h4>
                            </div>
                            
                            <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group-hover:border-blue-100 dark:group-hover:border-blue-900/50 relative">
                                <!-- arrow for desktop -->
                                <div class="hidden md:block absolute top-6 {{ $index % 2 == 0 ? '-left-3 border-l border-b' : '-right-3 border-t border-r' }} w-3 h-3 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rotate-45 transform transition-colors"></div>
                                
                                <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 transition-colors">
                                    {{ $job['description'] }}
                                </p>
                                <ul class="space-y-2 mb-5">
                                    @foreach($job['points'] as $point)
                                    <li class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300 transition-colors">
                                        <i data-lucide="check" class="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5"></i>
                                        <span>{{ $point }}</span>
                                    </li>
                                    @endforeach
                                </ul>
                                <div class="flex flex-wrap gap-2">
                                    @foreach($job['tags'] as $tag)
                                    <span class="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700 text-[10px] font-semibold uppercase tracking-wider rounded transition-colors">{{ $tag }}</span>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                    @endforeach

                </div>
            </div>
        </section>

        <!-- Bottom CTA -->
        <section class="px-6 md:px-12 lg:px-24">
            <div class="bg-slate-900 dark:bg-slate-800/80 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative overflow-hidden border border-transparent dark:border-slate-700 transition-colors">
                <!-- Decorative elements -->
                <div class="absolute right-0 top-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                <div class="absolute left-0 bottom-0 w-48 h-48 bg-purple-600 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

                <div class="relative z-10 text-center md:text-left">
                    <h3 class="text-xl md:text-2xl font-bold text-white mb-2">Ready to add value to your team?</h3>
                    <p class="text-slate-400 text-sm">I'm currently looking for full-time opportunities or exciting freelance projects.</p>
                </div>
                
                <a href="/contact" class="relative z-10 shrink-0 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 md:px-8 md:py-3.5 rounded-lg text-sm md:text-base font-medium transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2 w-full md:w-auto justify-center">
                    Let's connect <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </a>
            </div>
        </section>
    </div>
</x-layout>
