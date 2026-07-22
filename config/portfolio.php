<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Personal Information
    |--------------------------------------------------------------------------
    | Change your name, tagline, and contact info here.
    */
    'personal' => [
        'name' => 'Andrei Besañez',
        'initials' => 'AB',
        'role' => 'BSIT Student & Web Developer',
        'tagline' => 'I build clean and functional <br>web experiences.',
        'bio' => 'I\'m a BSIT student who loves turning ideas into real-world web applications. Focused on creating solutions that are simple, efficient, and impactful.',
        'about' => [
            'p1' => 'I\'m Andrei Besañez, a passionate Information Technology student focusing on web development. My journey in tech started with a curiosity about how things work on the internet, and it grew into a deep love for building interactive and impactful web experiences.',
            'p2' => 'I enjoy the challenge of turning complex problems into simple, beautiful, and intuitive interface designs. When I\'m not coding, you\'ll probably find me exploring new design trends or working on personal side projects.',
            'story_p1' => 'I started my journey with a curiosity about how websites work. That curiosity turned into a passion for building things on the web.',
            'story_p2' => 'As a BSIT student, I\'m constantly learning and improving my skills in web development, problem-solving, and creating meaningful digital experiences.',
        ],
        'email' => 'andreibesanez20@gmail.com',
        'phone' => '+63 915 533 9599',
        'location' => 'Purok 9-A, Aplaya, Digos City, Philippines',
        'availability' => 'Open for freelance & part-time work',
        'education' => [
            'degree' => 'Bachelor of Science in Information Technology',
            'school' => 'Cor Jesu College',
            'school_initials' => 'CJC',
            'year' => '2023 – Present',
            'logo' => 'images/CorJesu.webp',
            'description_p1' => 'Currently pursuing my BSIT degree where I\'m gaining strong foundations in programming, databases, networking, and system analysis.',
            'description_p2' => 'Actively involved in academic projects and self-learning to expand my skills.'
        ],
        'resume_link' => '#', // Link to your downloadable resume
    ],

    /*
    |--------------------------------------------------------------------------
    | Social Links
    |--------------------------------------------------------------------------
    */
    'socials' => [
        'github' => ['url' => 'https://github.com/andreibesanez', 'username' => '/andreibesanez'],
        'facebook' => ['url' => 'https://www.facebook.com/andrei.besanez', 'username' => '/andrei.besanez'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Skills (Technical Arsenal)
    |--------------------------------------------------------------------------
    */
    'skills' => [
        'frontend' => [
            ['name' => 'HTML5', 'icon_type' => 'text', 'icon_text' => '5', 'bg_color' => 'bg-orange-50 dark:bg-orange-500/10', 'text_color' => 'text-orange-500 dark:text-orange-400'],
            ['name' => 'CSS3', 'icon_type' => 'text', 'icon_text' => '3', 'bg_color' => 'bg-blue-50 dark:bg-blue-500/10', 'text_color' => 'text-blue-500 dark:text-blue-400'],
            ['name' => 'JavaScript', 'icon_type' => 'text', 'icon_text' => 'JS', 'bg_color' => 'bg-yellow-50 dark:bg-yellow-500/10', 'text_color' => 'text-yellow-500 dark:text-yellow-400'],
            ['name' => 'TypeScript', 'icon_type' => 'text', 'icon_text' => 'TS', 'bg_color' => 'bg-blue-50 dark:bg-blue-500/10', 'text_color' => 'text-blue-600 dark:text-blue-400'],
            ['name' => 'React', 'icon_type' => 'lucide', 'icon_name' => 'atom', 'bg_color' => 'bg-cyan-50 dark:bg-cyan-500/10', 'text_color' => 'text-cyan-500 dark:text-cyan-400'],
            ['name' => 'Next.js', 'icon_type' => 'text', 'icon_text' => 'N', 'bg_color' => 'bg-slate-100 dark:bg-slate-800', 'text_color' => 'text-slate-900 dark:text-white'],
            ['name' => 'Tailwind CSS', 'icon_type' => 'lucide', 'icon_name' => 'waves', 'bg_color' => 'bg-teal-50 dark:bg-teal-500/10', 'text_color' => 'text-teal-500 dark:text-teal-400'],
            ['name' => 'Vite', 'icon_type' => 'lucide', 'icon_name' => 'zap', 'bg_color' => 'bg-purple-50 dark:bg-purple-500/10', 'text_color' => 'text-purple-500 dark:text-purple-400'],
        ],
        'backend' => [
            ['name' => 'PHP', 'icon_type' => 'text', 'icon_text' => 'PHP', 'bg_color' => 'bg-indigo-50 dark:bg-indigo-500/10', 'text_color' => 'text-indigo-500 dark:text-indigo-400'],
            ['name' => 'Laravel', 'icon_type' => 'lucide', 'icon_name' => 'triangle', 'bg_color' => 'bg-red-50 dark:bg-red-500/10', 'text_color' => 'text-red-500 dark:text-red-400'],
            ['name' => 'Node.js', 'icon_type' => 'lucide', 'icon_name' => 'hexagon', 'bg_color' => 'bg-green-50 dark:bg-green-500/10', 'text_color' => 'text-green-600 dark:text-green-400'],
            ['name' => 'MySQL', 'icon_type' => 'lucide', 'icon_name' => 'database', 'bg_color' => 'bg-blue-50 dark:bg-blue-500/10', 'text_color' => 'text-blue-600 dark:text-blue-400'],
            ['name' => 'MongoDB', 'icon_type' => 'text', 'icon_text' => 'M', 'bg_color' => 'bg-green-50 dark:bg-green-500/10', 'text_color' => 'text-green-700 dark:text-green-400'],
            ['name' => 'Firebase', 'icon_type' => 'lucide', 'icon_name' => 'flame', 'bg_color' => 'bg-orange-50 dark:bg-orange-500/10', 'text_color' => 'text-orange-500 dark:text-orange-400'],
        ],
        'tools' => [
            ['name' => 'Git', 'icon' => 'git-branch'],
            ['name' => 'GitHub', 'icon' => 'git-merge'],
            ['name' => 'VS Code', 'icon' => 'code'],
            ['name' => 'Figma', 'icon' => 'pen-tool'],
            ['name' => 'Postman', 'icon' => 'send'],
        ],
        'learning' => ['Docker', 'AWS', 'React Native'],
        'strengths' => [
            'Clean, maintainable code architecture',
            'User-centric UI/UX implementation',
            'Strong problem-solving fundamentals',
            'Effective communication & teamwork'
        ]
    ],

    /*
    |--------------------------------------------------------------------------
    | Experience (Professional Journey)
    |--------------------------------------------------------------------------
    */
    'experience' => [
        [
            'title' => 'Freelance Web Developer',
            'company' => 'Self-Employed',
            'duration' => 'Jan 2024 – Present',
            'description' => 'Designing and developing custom web applications and landing pages for local businesses. Handling everything from client requirements to deployment.',
            'points' => [
                'Built responsive e-commerce sites using Next.js and Tailwind CSS.',
                'Implemented CMS solutions for easy content management.'
            ],
            'tags' => ['React', 'Laravel', 'Figma'],
            'dot_color' => 'border-blue-600 dark:border-blue-500' // the border color for the timeline dot
        ],
        [
            'title' => 'Web Developer Intern',
            'company' => 'Tech Solutions Inc.',
            'duration' => 'Aug 2023 – Dec 2023',
            'description' => 'Assisted the senior development team in building and maintaining enterprise applications. Focused on front-end bug fixes and UI improvements.',
            'points' => [
                'Resolved over 50+ UI/UX issues reported by QA.',
                'Collaborated in migrating legacy CSS to Tailwind CSS.'
            ],
            'tags' => ['HTML/CSS', 'JavaScript', 'Git'],
            'dot_color' => 'border-slate-300 dark:border-slate-700'
        ],
        [
            'title' => 'Documentation Specialist (Capstone)',
            'company' => 'Cor Jesu College',
            'duration' => 'June 2026 – Present',
            'description' => 'Managed and authored comprehensive project documentation for our final year capstone project, "Chainbudget" (chainbudget.vercel.app), ensuring clarity and compliance with academic standards.',
            'points' => [
                'Authored system manuals, technical specifications, and research chapters.',
                'Collaborated closely with developers to accurately document system features and workflows.'
            ],
            'tags' => ['Technical Writing', 'Documentation', 'Research'],
            'dot_color' => 'border-slate-300 dark:border-slate-700'
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Projects
    |--------------------------------------------------------------------------
    */
    'projects' => [
        [
            'is_featured' => false,
            'title' => 'Chainbudget',
            'description' => 'A blockchain-based budget management system for transparent organizational fund monitoring. Authored full project documentation and system manuals.',
            'tags' => ['Blockchain', 'Documentation', 'Technical Writing'],
            'image' => 'images/projects/chainbudget.png',
            'banner_bg' => 'bg-indigo-50 dark:bg-indigo-900/20',
            'banner_text' => 'text-indigo-400 dark:text-indigo-600',
            'link' => 'https://chainbudget.vercel.app'
        ],
        [
            'is_featured' => false,
            'title' => '4PS-Nexus',
            'description' => 'A blockchain-based disbursement system for the Philippine 4Ps program using Stellar Smart Contracts. Handled project documentation and business strategy during a hackathon.',
            'tags' => ['Hackathon', 'Documentation', 'Business Strategy'],
            'image' => 'images/projects/4ps-Nexus.png',
            'banner_bg' => 'bg-emerald-50 dark:bg-emerald-900/20',
            'banner_text' => 'text-emerald-400 dark:text-emerald-600',
            'link' => 'https://4-ps-nexus.vercel.app'
        ]
    ]
];
