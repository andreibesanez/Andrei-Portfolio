<x-layout>
    <div class="max-w-7xl mx-auto pb-24">
        <!-- Skills Hero Section -->
        <section class="pt-20 pb-16 px-6 md:px-12 lg:px-24 relative" data-aos="fade-up">
            <!-- Decorative Elements -->
            <div class="absolute right-20 top-20 opacity-20 pointer-events-none">
                <div class="grid grid-cols-4 gap-3">
                    @for($i=0; $i<16; $i++)
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                    @endfor
                </div>
            </div>
            <div class="absolute top-40 right-40 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 -z-10 transition-colors"></div>

            <div class="max-w-2xl z-10 relative">
                <div class="flex items-center gap-3 mb-4">
                    <span class="text-blue-600 dark:text-blue-500 font-semibold text-sm tracking-wide transition-colors">Hello, I'm</span>
                    <div class="h-px w-12 bg-blue-200 dark:bg-blue-800 transition-colors"></div>
                </div>
                
                <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 md:mb-6 transition-colors">
                    Technical Arsenal
                </h1>
                
                <p class="text-slate-500 dark:text-slate-400 text-base leading-relaxed transition-colors">
                    Here are the technologies, frameworks, and tools I use to build scalable web applications and create meaningful digital experiences.
                </p>
            </div>
        </section>

        <!-- Main Skills Area -->
        <section class="px-6 md:px-12 lg:px-24 mb-20" data-aos="fade-up">
            <div class="flex flex-col lg:flex-row gap-12">
                <!-- Left Column: Tech Stacks -->
                <div class="lg:w-2/3 space-y-16">
                    
                    <!-- Frontend Development -->
                    <div>
                        <div class="flex items-center gap-3 mb-8">
                            <div class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 transition-colors">
                                <i data-lucide="layout" class="w-5 h-5"></i>
                            </div>
                            <h2 class="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Frontend Development</h2>
                        </div>
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <!-- Skill Items -->
                            @foreach(config('portfolio.skills.frontend') as $skill)
                            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-md transition-all group">
                                <div class="w-12 h-12 {{ $skill['bg_color'] }} {{ $skill['text_color'] }} rounded-lg flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                                    @if($skill['icon_type'] === 'text')
                                        {{ $skill['icon_text'] }}
                                    @else
                                        <i data-lucide="{{ $skill['icon_name'] }}" class="w-6 h-6"></i>
                                    @endif
                                </div>
                                <span class="text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors">{{ $skill['name'] }}</span>
                            </div>
                            @endforeach
                        </div>
                    </div>

                    <!-- Backend & Database -->
                    <div>
                        <div class="flex items-center gap-3 mb-8">
                            <div class="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50 transition-colors">
                                <i data-lucide="server" class="w-5 h-5"></i>
                            </div>
                            <h2 class="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Backend & Database</h2>
                        </div>
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            @foreach(config('portfolio.skills.backend') as $skill)
                            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-md transition-all group">
                                <div class="w-12 h-12 {{ $skill['bg_color'] }} {{ $skill['text_color'] }} rounded-lg flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                                    @if($skill['icon_type'] === 'text')
                                        {{ $skill['icon_text'] }}
                                    @else
                                        <i data-lucide="{{ $skill['icon_name'] }}" class="w-6 h-6"></i>
                                    @endif
                                </div>
                                <span class="text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors">{{ $skill['name'] }}</span>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>
                
                <!-- Right Column: Tools, Soft Skills, Learning -->
                <div class="lg:w-1/3 space-y-8">
                    <!-- Tools & Workflow -->
                    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm transition-colors">
                        <div class="flex items-center gap-3 mb-6">
                            <i data-lucide="wrench" class="w-5 h-5 text-slate-400 dark:text-slate-500"></i>
                            <h3 class="font-bold text-slate-900 dark:text-white transition-colors">Tools & Workflow</h3>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            @foreach(config('portfolio.skills.tools') as $tool)
                            <span class="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-md flex items-center gap-2 transition-colors">
                                <i data-lucide="{{ $tool['icon'] }}" class="w-3 h-3"></i> {{ $tool['name'] }}
                            </span>
                            @endforeach
                        </div>
                    </div>

                    <!-- Soft Skills -->
                    <div class="bg-slate-900 dark:bg-slate-800/80 text-white border border-slate-800 dark:border-slate-700 rounded-2xl p-8 shadow-lg relative overflow-hidden transition-colors">
                        <div class="absolute -right-8 -top-8 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
                        <div class="flex items-center gap-3 mb-6 relative z-10">
                            <i data-lucide="lightbulb" class="w-5 h-5 text-blue-400"></i>
                            <h3 class="font-bold text-white">Core Strengths</h3>
                        </div>
                        <ul class="space-y-4 relative z-10">
                            @foreach(config('portfolio.skills.strengths') as $strength)
                            <li class="flex items-start gap-3">
                                <i data-lucide="check-circle-2" class="w-4 h-4 text-blue-400 shrink-0 mt-0.5"></i>
                                <span class="text-sm text-slate-300">{{ $strength }}</span>
                            </li>
                            @endforeach
                        </ul>
                    </div>

                    <!-- Currently Learning -->
                    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl p-8 transition-colors">
                        <div class="flex items-center gap-3 mb-4">
                            <i data-lucide="book-open" class="w-5 h-5 text-blue-600 dark:text-blue-400 transition-colors"></i>
                            <h3 class="font-bold text-slate-900 dark:text-white transition-colors">Currently Learning</h3>
                        </div>
                        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 transition-colors">
                            I believe in continuous growth. Right now, I'm spending my free time exploring these technologies:
                        </p>
                        <div class="flex flex-wrap gap-2">
                            @foreach(config('portfolio.skills.learning') as $learning)
                            <span class="px-2.5 py-1 bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded shadow-sm border border-transparent dark:border-slate-700 transition-colors">{{ $learning }}</span>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Bottom CTA -->
        <section class="px-6 md:px-12 lg:px-24" data-aos="fade-up">
            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm transition-colors">
                <div>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1 transition-colors">Looking for a specific skill?</h3>
                    <p class="text-slate-500 dark:text-slate-400 text-sm transition-colors">I'm highly adaptable and pick up new technologies quickly based on project needs.</p>
                </div>
                <a href="/contact" class="shrink-0 bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm shadow-sm flex items-center gap-2">
                    Message Me <i data-lucide="message-square" class="w-4 h-4"></i>
                </a>
            </div>
        </section>
    </div>
</x-layout>

