<x-layout>
    <div class="max-w-7xl mx-auto pb-24">
        <!-- Projects Hero Section -->
        <section class="pt-20 pb-16 px-6 md:px-12 lg:px-24 relative" data-aos="fade-up">
            <div class="absolute right-20 top-20 opacity-20 pointer-events-none">
                <div class="grid grid-cols-4 gap-3">
                    @for($i=0; $i<16; $i++)
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                    @endfor
                </div>
                <div class="absolute -bottom-8 -left-8 w-24 h-24 border-b-2 border-l-2 border-blue-200 dark:border-blue-900 transition-colors"></div>
            </div>

            <div class="max-w-2xl z-10 relative">
                <div class="flex items-center gap-3 mb-4">
                    <span class="text-blue-600 dark:text-blue-500 font-semibold text-sm tracking-wide transition-colors">Hello, I'm</span>
                    <div class="h-px w-12 bg-blue-200 dark:bg-blue-800 transition-colors"></div>
                </div>
                
                <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 transition-colors">
                    My Projects
                </h1>
                
                <p class="text-slate-500 dark:text-slate-400 text-base leading-relaxed transition-colors">
                    A collection of web applications and digital solutions I've built to solve real-world problems and create meaningful user experiences.
                </p>
            </div>
        </section>

        <!-- Featured Project -->
        @php
            $featuredProject = collect(config('portfolio.projects'))->firstWhere('is_featured', true);
        @endphp
        
        @if($featuredProject)
        <section class="px-6 md:px-12 lg:px-24 mb-16" data-aos="fade-up">
            <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row gap-8 lg:gap-12 relative overflow-hidden transition-colors">
                <!-- Image side -->
                <div class="lg:w-[55%] relative rounded-2xl overflow-hidden bg-slate-900 dark:bg-slate-950 aspect-4/3 flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-inner transition-colors">
                    <!-- Badge -->
                    <div class="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider z-20">
                        FEATURED PROJECT
                    </div>
                    
                    <!-- Placeholder UI -->
                    <div class="absolute inset-2 sm:inset-4 rounded-xl border border-slate-800 dark:border-slate-700 bg-slate-950 dark:bg-slate-900 flex p-3 sm:p-4 transition-colors overflow-hidden">
                        <div class="flex gap-2 sm:gap-4 w-full h-full">
                            <div class="hidden sm:block w-16 border-r border-slate-800 dark:border-slate-700 space-y-4 pt-4 transition-colors">
                                <div class="w-6 h-6 rounded bg-blue-600/20 mx-auto"></div>
                                <div class="w-6 h-6 rounded bg-slate-800 dark:bg-slate-700 mx-auto transition-colors"></div>
                                <div class="w-6 h-6 rounded bg-slate-800 dark:bg-slate-700 mx-auto transition-colors"></div>
                            </div>
                            <div class="flex-1 space-y-3 sm:space-y-6 pt-1 sm:pt-2 flex flex-col">
                                <h4 class="text-slate-300 font-medium text-xs sm:text-sm">Dashboard</h4>
                                <div class="flex gap-2 sm:gap-4">
                                    <div class="flex-1 bg-slate-900 dark:bg-slate-800 rounded-lg p-2 sm:p-3 border border-slate-800 dark:border-slate-700 transition-colors">
                                        <div class="text-[8px] sm:text-[10px] text-slate-500 mb-1">Total Balance</div>
                                        <div class="text-sm sm:text-lg text-white font-bold">$24,780</div>
                                    </div>
                                    <div class="flex-1 bg-slate-900 dark:bg-slate-800 rounded-lg p-2 sm:p-3 border border-slate-800 dark:border-slate-700 transition-colors">
                                        <div class="text-[8px] sm:text-[10px] text-slate-500 mb-1">Income</div>
                                        <div class="text-sm sm:text-lg text-white font-bold">$12,540</div>
                                    </div>
                                </div>
                                <div class="w-full flex-1 min-h-[4rem] bg-slate-900 dark:bg-slate-800 rounded-lg border border-slate-800 dark:border-slate-700 relative overflow-hidden transition-colors mt-auto">
                                    <!-- abstract chart line -->
                                    <div class="absolute bottom-0 w-full h-1/2 bg-blue-600/10 border-t-2 border-blue-600 translate-y-2 sm:translate-y-4 transform rotate-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Info side -->
                <div class="lg:w-[45%] flex flex-col justify-center">
                    <div class="flex items-center gap-2 text-blue-600 dark:text-blue-500 font-medium text-xs mb-3 transition-colors">
                        <span>{{ $featuredProject['short_title'] ?? $featuredProject['title'] }}</span>
                        <span class="text-slate-300 dark:text-slate-600 transition-colors">&bull;</span>
                        <span>{{ $featuredProject['category'] ?? 'App' }}</span>
                    </div>
                    
                    <h2 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">{{ $featuredProject['title'] }}</h2>
                    
                    <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 transition-colors">
                        {{ $featuredProject['description'] }}
                    </p>
                    
                    <div class="space-y-4 mb-8">
                        <div class="flex items-start gap-4">
                            <div class="w-8 h-8 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 shrink-0 transition-colors">
                                <i data-lucide="user" class="w-4 h-4"></i>
                            </div>
                            <div>
                                <span class="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Role</span>
                                <span class="text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors">{{ $featuredProject['role'] ?? 'Developer' }}</span>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="w-8 h-8 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 shrink-0 transition-colors">
                                <i data-lucide="calendar" class="w-4 h-4"></i>
                            </div>
                            <div>
                                <span class="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Year</span>
                                <span class="text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors">{{ $featuredProject['year'] ?? date('Y') }}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex flex-wrap gap-2 mb-8">
                        @foreach($featuredProject['tags'] as $tag)
                        <span class="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-md shadow-sm transition-colors">{{ $tag }}</span>
                        @endforeach
                    </div>
                    
                    <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-2">
                        <a href="{{ $featuredProject['link_case_study'] ?? '#' }}" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm shadow-md shadow-blue-500/20">
                            View Case Study <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </a>
                        <a href="{{ $featuredProject['link_demo'] ?? '#' }}" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors text-sm px-6 py-3 sm:px-0 sm:py-0 border sm:border-transparent border-blue-100 dark:border-blue-900/50 rounded-lg sm:rounded-none">
                            Live Demo <i data-lucide="external-link" class="w-4 h-4"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        @endif

        <!-- Project Grid -->
        <section class="px-6 md:px-12 lg:px-24 mb-24" data-aos="fade-up">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                @foreach(collect(config('portfolio.projects'))->filter(fn($p) => !($p['is_featured'] ?? false)) as $project)
                <!-- Card -->
                <div class="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                    <div class="h-48 {{ $project['banner_bg'] ?? 'bg-slate-100 dark:bg-slate-800' }} relative overflow-hidden border-b border-slate-100 dark:border-slate-800 flex items-center justify-center transition-colors group-hover:opacity-90">
                        @if(isset($project['image']))
                            <img src="{{ asset($project['image']) }}" alt="{{ $project['title'] }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        @else
                            <div class="{{ $project['banner_text'] ?? 'text-slate-400 dark:text-slate-500' }} font-bold text-xl transition-colors">{{ $project['title'] }}</div>
                        @endif
                    </div>
                    <div class="p-6 flex flex-col flex-1">
                        <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">{{ $project['title'] }}</h3>
                        <p class="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 transition-colors">{{ $project['description'] }}</p>
                        
                        <div class="flex flex-wrap gap-2 mb-6 mt-auto">
                            @foreach($project['tags'] as $tag)
                            <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium rounded-full transition-colors">{{ $tag }}</span>
                            @endforeach
                        </div>
                        
                        <a href="{{ $project['link'] ?? '#' }}" class="text-blue-600 dark:text-blue-500 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-400 flex items-center justify-between group/link transition-colors">
                            View Project
                            <i data-lucide="arrow-right" class="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"></i>
                        </a>
                    </div>
                </div>
                @endforeach
                
            </div>
        </section>

        <!-- Bottom Call to Action -->
        <section class="px-6 md:px-12 lg:px-24" data-aos="fade-up">
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-100 dark:border-blue-800/50 transition-colors">
                <div class="flex items-center gap-6">
                    <div class="w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-sm border border-blue-100 dark:border-slate-800 shrink-0 transition-colors">
                        <i data-lucide="rocket" class="w-8 h-8 text-blue-500 fill-blue-50 dark:fill-blue-900/30 transition-colors"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1 transition-colors">Have a project in mind?</h3>
                        <p class="text-slate-500 dark:text-slate-400 text-sm transition-colors">I'm always open to discussing new opportunities and interesting projects.</p>
                    </div>
                </div>
                
                <a href="/contact" class="shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm shadow-sm flex items-center gap-2">
                    Let's Work Together <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </a>
            </div>
        </section>

    </div>
</x-layout>

