/**
 * config.js - Configuration file for Interactive Nature website
 * Centralized place to update content and settings
 */

// Site-wide configuration
export const siteConfig = {
    siteName: 'Interactive Nature',
    tagline: 'Spatial Experience Design',
    contactEmail: 'interactivenatureart@gmail.com',
    contactPhone: '(512) 439-9893',
    location: 'Austin, TX',
    social: {
        instagram: 'https://instagram.com/interactivenature',
        twitter: 'https://twitter.com/interactivenature',
        linkedin: 'https://linkedin.com/company/interactivenature',
    },
    copyright: '© 2025 Interactive Nature Studio. All rights reserved.'
};

// Hero section configuration
export const heroConfig = {
    heading: 'Crafting Spatial Experiences That Transform Reality',
    subheading: 'We\'re an Austin-based design studio specializing in immersive environments, interactive installations, and technical event production.',
    ctaText: 'Start a Project',
    ctaLink: '#contact'
};

// Services section configuration
export const servicesConfig = {
    heading: 'Our Services',
    subheading: 'We blend technical precision with creative vision to deliver extraordinary spatial experiences.',
    services: [
        {
            title: 'Technical Event Production',
            description: 'Comprehensive technical drafting and production services for events of any scale. From initial concept to final execution, we ensure your event space is meticulously planned and perfectly realized.',
            learnMoreLink: 'services/technical-event-production.html'
        },
        {
            title: 'Interactive Installations',
            description: 'Custom-designed interactive environments that respond to human presence and movement. We create memorable experiences through responsive projection art, sensor-based interactions, and immersive audio-visual elements.',
            learnMoreLink: 'services/interactive-installations.html'
        },
        {
            title: 'Digital Environment Design',
            description: 'Virtual production environments, 3D visualizations, and pre-visualization services that bring digital worlds to life for film, events, and architectural presentations.',
            learnMoreLink: 'services/digital-environment-design.html'
        },
        {
            title: 'Projection Mapping & Art',
            description: 'Transform any surface into a canvas for dynamic visual storytelling. Our audio-reactive projection art creates immersive environments that respond to sound and music in real-time.',
            learnMoreLink: 'services/projection-mapping-art.html'
        }
    ]
};

// Work/portfolio section configuration
export const workConfig = {
    heading: 'Our Work',
    subheading: 'A selection of our most innovative spatial experiences and technical productions.',
    projects: [
        {
            title: 'SXSW Installations',
            description: 'Interactive Installations for SXSW 2024',
            imageSrc: 'assets/images/portfolio/giftingSolon.png',
            imageAlt: 'Interactive Installation for SXSW',
            projectUrl: 'projects/sxsw_install.html',
            isNDA: true 
        },
        {
            title: 'Broadway Musical VFX Design',
            description: 'Music visualization for Broadway theatre production',
            imageSrc: 'assets/images/portfolio/onceuponaonemoreTime.png',
            imageAlt: 'VFX and Content Production',
            projectUrl: 'projects/ouomt.html'
        },
        {
            title: 'Fusebox',
            description: 'Event Production, Projection Mapping',
            imageSrc: 'assets/images/portfolio/Fusebash2025.jpg',
            imageAlt: 'Fusebox Event Production',
            projectUrl: 'projects/fusebox.html'
        },
        {
            title: 'Interactive Fortune Telling Experience',
            description: 'Interactive Experience Development and Fabrication for Event',
            imageSrc: 'assets/images/portfolio/zoltar.jpg',
            imageAlt: 'Custom Interactive Experience and Fabrication for Event',
            projectUrl: 'projects/discountfortunes.html'
        },
        {
            title: 'Interactive Digital Art',
            description: 'Interactive NFT art installation',
            imageSrc: 'assets/images/portfolio/boredApes.jpg',
            imageAlt: 'Bored Apes NFT Installation',
            projectUrl: 'projects/interactiveart_ba.html',
            isNDA: true // NDA protected project
        },
        {
            title: 'Fimfo',
            description: 'Techincal Drafting and Fabrication',
            imageSrc: 'assets/images/portfolio/fimfoDoor.jpg',
            imageAlt: 'Camp Fimfo Drafting and Fabrication',
            projectUrl: 'projects/fimfo.html'
        },
        {
            title: 'Audio Reactive Immserive Lighting Installation',
            description: 'Design, Installation, Audio Reactive Lighting',
            imageSrc: 'assets/images/portfolio/fullframe2.jpg',
            imageAlt: 'Audio Reactive Immserive Lighting Installation',
            projectUrl: 'projects/siesmic.html'
        },
        {
            title: 'Little Mermaid Projection',
            description: 'Projection mapping and content for immersive theatrical production',
            imageSrc: 'assets/images/portfolio/LittleMermaid.jpg',
            imageAlt: 'Little Mermaid Projection Mapping',
            projectUrl: 'projects/thelittlemermaid.html'
        },
        {
            title: 'VR / Virtual Production Mineshaft Experience',
            description: 'Immersive digital environment for VR and virtual production set',
            imageSrc: 'assets/images/portfolio/explosion.jpg',
            imageAlt: 'Mineshaft Digital Environment',
            projectUrl: 'projects/virtualproducion_vr_cave.html',
            isNDA: true // NDA protected project
        },
        {
            title: 'Digital Environments for Virtual Production',
            description: 'Immersive digital environment and virtual production set',
            imageSrc: 'assets/images/portfolio/office.png',
            imageAlt: 'Virtual Production Digital Environment',
            projectUrl: 'projects/cisco_virtualproduction.html',
            isNDA: true // NDA protected project
        },
        {
            title: 'Digital Environments for Virtual Production',
            description: 'Immersive digital environment and virtual production set',
            imageSrc: 'assets/images/portfolio/frontWall.png',
            imageAlt: 'Virtual Production Digital Environment',
            projectUrl: 'projects/dragshow_bb_jp.html',
            isNDA: true // NDA protected project
        },
        {
            title: 'Interactive Art Web Experience',
            description: 'Interactive NFT art Web Experience',
            imageSrc: 'assets/projects/InteractiveArt_CP/selected/blacklight.png',
            imageAlt: 'Cryptopunks NFT Installation',
            projectUrl: 'projects/interactiveart_cp.html',
            isNDA: true // NDA protected project
        },
        {
            title: 'Interactive Living Painting',
            description: 'R&D Living Painting Project',
            imageSrc: 'assets/images/portfolio/sleepingDumbledore2.jpg',
            imageAlt: 'Living Painting',
            projectUrl: 'projects/interactiveart_wb.html',
            isNDA: true
        },
        {
            title: 'AIMI',
            description: 'Technical Drafting, 3D Rendering, Previsualization',
            imageSrc: 'assets/images/portfolio/MainSpaceRender.png',
            imageAlt: 'AIMI',
            projectUrl: 'projects/aimi.html'
        },
        {
            title: 'Datura',
            description: 'Audio Reactive Projection mapping for Event',
            imageSrc: 'assets/images/portfolio/party2.png',
            imageAlt: 'Detura Projection Mapping and Content',
            projectUrl: 'projects/datura.html'
        },
    ]
};

// Clients section configuration
export const clientsConfig = {
    heading: 'Clients We\'ve Worked With',
    subheading: 'Trusted by innovative brands across industries',
    clients: [
        {
            name: 'Fusebox',
            logoSrc: 'assets/images/clients/Fusebox-Logo.png',
            logoAlt: 'Fusebox Logo'
        },
        {
            name: 'WarnerBrothers',
            logoSrc: 'assets/images/clients/warner-bros-logo.png',
            logoAlt: 'WarnerBrothersLogo'
        },
        {
            name: 'Rooster Teeth',
            logoSrc: 'assets/images/clients/roosterTeeth.png',
            logoAlt: 'Rooster Teeth'
        },
        {
            name: 'Ru Paul',
            logoSrc: 'assets/images/clients/RuPaul.png',
            logoAlt: 'RuPaulsDragRace'
        },
        {
            name: 'RollingStone',
            logoSrc: 'assets/images/clients/rolingStone.png',
            logoAlt: 'Rolling Stone'
        },
        {
            name: 'Indeed',
            logoSrc: 'assets/images/clients/indeed.png',
            logoAlt: 'Client Logo 5'
        },
        {
            name: 'Delta',
            logoSrc: 'assets/images/clients/delta.png',
            logoAlt: 'Delta'
        },
        {
            name: 'Cisco',
            logoSrc: 'assets/images/clients/cisco.png',
            logoAlt: 'Cisco'
        },
        {
            name: 'Meta',
            logoSrc: 'assets/images/clients/meta.png',
            logoAlt: 'Meta'
        },
        {
            name: 'AIMI',
            logoSrc: 'assets/images/clients/aimi.png',
            logoAlt: 'AIMI'
        },
        {
            name: 'GhostCorp',
            logoSrc: 'assets/images/clients/ghostCorp.png',
            logoAlt: 'GhostCorp'
        },
        {
            name: 'KFMA',
            logoSrc: 'assets/images/clients/kfma.png',
            logoAlt: 'KFMA'
        },
        {
            name: 'Northgate Resorts',
            logoSrc: 'assets/images/clients/northgate.png',
            logoAlt: 'Northgate Resorts'
        },
        {
            name: 'Red Velvet',
            logoSrc: 'assets/images/clients/RedVelvet.png',
            logoAlt: 'Red Velvet'
        },
        {
            name: 'Philip Morris',
            logoSrc: 'assets/images/clients/philip_morris.png',
            logoAlt: 'Philip Morris'
        }
    ]
};

// About section configuration
export const aboutConfig = {
    heading: 'We Are Interactive Nature',
    paragraphs: [
        'Founded in Austin, TX, our studio combines technical precision with creative vision to craft extraordinary spatial experiences. We believe in the transformative power of thoughtfully designed environments, whether physical, digital, or somewhere in between.',
        'Our multidisciplinary team brings together expertise in architectural design, interactive technology, visual arts, and event production to create experiences that engage, inspire, and transform.'
    ],
    ctaText: 'Work With Us',
    ctaLink: '#contact',
    name: 'Team',
    imageSrc: 'assets/images/team.jpg',
    imageAlt: 'Interactive Nature Studio Team',
  
};

// Contact section configuration
export const contactConfig = {
    heading: 'Let\'s Create Something Extraordinary',
    subheading: 'Whether you have a specific project in mind or just want to explore possibilities, we\'re here to help bring your vision to life.',
    formFields: [
        {
            id: 'name',
            label: 'Name',
            type: 'text',
            required: true
        },
        {
            id: 'email',
            label: 'Email',
            type: 'email',
            required: true
        },
        {
            id: 'project',
            label: 'Project Type',
            type: 'text',
            required: false
        },
        {
            id: 'message',
            label: 'Message',
            type: 'textarea',
            rows: 5,
            required: true
        }
    ],
    submitButtonText: 'Send Message'
};

// Project Gallery configuration
export const galleryConfig = {
    heading: 'Our Projects',
    subheading: 'Explore our diverse portfolio of immersive experiences and creative solutions.',
    videoSources: [
        // Fusebox videos
        {
            projectId: 'fusebox',
            videoSrc: 'assets/projects/Fusebox/cloudsRender3.mp4'
        },
        {
            projectId: 'fusebox',
            videoSrc: 'assets/projects/Fusebox/cloudTransitionComposite2 - Trim.mp4'
        },
        {
            projectId: 'fusebox',
            videoSrc: 'assets/projects/Fusebox/fuseboxDesk_sm.mp4'
        },
        
        // OUOMT/Broadway videos
        {
            projectId: 'broadway-musical-vfx-design',
            videoSrc: 'assets/videos/OMT_Extended Trailer.mp4'
        },
        
        // Audio reactive installations
        {
            projectId: 'audio-reactive-immserive-lighting-installation',
            videoSrc: 'assets/videos/waterRipple.mp4'
        },
        {
            projectId: 'audio-reactive-immserive-lighting-installation',
            videoSrc: 'assets/videos/DancingFlowerRender_sm.mp4'
        },
        
        // Datura project
        {
            projectId: 'datura',
            videoSrc: 'assets/videos/DancingFlowerRender_sm.mp4'
        },
        
        // KFMA videos
        {
            projectId: 'kfma',
            videoSrc: 'assets/projects/KFMA/KFMACausticLogo (1).mp4'
        },
        {
            projectId: 'kfma',
            videoSrc: 'assets/videos/KFMACausticLogo.mp4'
        },
        {
            projectId: 'kfma',
            videoSrc: 'assets/videos/KFMAParticles.mp4'
        },
        
        // Little Mermaid
        {
            projectId: 'little-mermaid-projection',
            videoSrc: 'assets/videos/waterRipple.mp4'
        },
        
        // Interactive Art projects
        {
            projectId: 'siesmic',
            videoSrc: 'assets/videos/siesmicReel.mp4'
        },
        {
            projectId: 'interactive-fortune-telling-experience',
            videoSrc: 'assets/videos/waterRipple.mp4'
        },
        {
            projectId: 'siesmic',
            videoSrc: 'assets/videos/siesmicReel.mp4'
        },
        
        // VR/Virtual Production
        {
            projectId: 'fusebox',
            videoSrc: 'assets/videos/fusebox_table.mp4'
        },
        
        // Illumiverse
        {
            projectId: 'illumiverse',
            videoSrc: 'assets/projects/Illumiverse/IMG_5436 (1).MP4'
        },
        
        // Additional videos with cloud effects
        {
            projectId: 'cloud-effects',
            videoSrc: 'assets/videos/car.mp4'
        },
                // Additional videos 
        {
            projectId: 'cloud-effects',
            videoSrc: 'assets/videos/DancingFlowerRender_sm.mp4'
        },
                // Additional videos
        {
            projectId: 'cloud-effects',
            videoSrc: 'assets/videos/KFMAParticles.mp4'
        },
                // Additional videos 
        {
            projectId: 'cloud-effects',
            videoSrc: 'assets/videos/OMT_Extended Trailer.mp4'
        },
                    // Additional videos 
        {
            projectId: 'cloud-effects',
            videoSrc: 'assets/videos/portalDoor.mp4'
        },
                // Additional videos 
        {
            projectId: 'cloud-effects',
            videoSrc: 'assets/videos/siesmicReel.mp4'
        }
    ],
    
    // Additional image sources for the gallery
    imageSources: [
        // SXSW Install images
        {
            projectId: 'sxsw-installations',
            imageSrc: 'assets/projects/SXSW_Install/selected/giftingSolon.JPG'
        },
        {
            projectId: 'sxsw-installations',
            imageSrc: 'assets/projects/SXSW_Install/selected/deltaBooths.JPG'
        },
        {
            projectId: 'sxsw-installations',
            imageSrc: 'assets/projects/SXSW_Install/McLendon-Photography-0490.jpg'
        },
        
        // Interactive Art BA
        {
            projectId: 'interactive-digital-art',
            imageSrc: 'assets/projects/InteractiveArt_BA/selected/BA_swampDusk.png'
        },
        {
            projectId: 'interactive-digital-art',
            imageSrc: 'assets/projects/InteractiveArt_BA/selected/swamp.jpg'
        },
        
        // Interactive Art CP
        {
            projectId: 'interactive-art-web-experience',
            imageSrc: 'assets/projects/InteractiveArt_CP/selected/blacklight.png'
        },
        {
            projectId: 'interactive-art-web-experience',
            imageSrc: 'assets/projects/InteractiveArt_CP/selected/disco.png'
        },
        {
            projectId: 'interactive-art-web-experience',
            imageSrc: 'assets/projects/InteractiveArt_CP/selected/lockers.png'
        },
        
        // Interactive Art WB
        {
            projectId: 'interactive-living-painting',
            imageSrc: 'assets/projects/InteractiveArt_WB/selected/backdrop.jpg'
        },
        {
            projectId: 'interactive-living-painting',
            imageSrc: 'assets/projects/InteractiveArt_WB/sleepingDumbledore2.jpg'
        },
        {
            projectId: 'interactive-living-painting',
            imageSrc: 'assets/projects/InteractiveArt_WB/selected/dumbledoreLeaving.jpg'
        },
        
        // Little Mermaid
        {
            projectId: 'little-mermaid-projection',
            imageSrc: 'assets/projects/TheLittleMermaid/selected/oceanView.jpg'
        },
        {
            projectId: 'little-mermaid-projection',
            imageSrc: 'assets/projects/TheLittleMermaid/selected/TritonsCourt.png'
        },
        
        // Datura
        {
            projectId: 'datura',
            imageSrc: 'assets/projects/Datura/selected/forbiddenGarden.png'
        },
        {
            projectId: 'datura',
            imageSrc: 'assets/projects/Datura/selected/party2.png'
        },
        
        // OUOMT
        {
            projectId: 'broadway-musical-vfx-design',
            imageSrc: 'assets/projects/OUOMT/selected/onceUponAOneMoreTime.PNG'
        },
        {
            projectId: 'broadway-musical-vfx-design',
            imageSrc: 'assets/projects/OUOMT/selected/OUAOMT1.jpg'
        },
        
        // Portfolio images
        {
            projectId: 'portfolio-highlights',
            imageSrc: 'assets/images/portfolio/acheivementHunter.png'
        },
        {
            projectId: 'portfolio-highlights',
            imageSrc: 'assets/images/portfolio/AIMIRender.png'
        },
        {
            projectId: 'portfolio-highlights',
            imageSrc: 'assets/images/portfolio/barbWire_greenFlame.png'
        },
        {
            projectId: 'portfolio-highlights',
            imageSrc: 'assets/images/portfolio/boredApes.jpg'
        },
        {
            projectId: 'portfolio-highlights',
            imageSrc: 'assets/images/portfolio/elementalMedia.PNG'
        },
        {
            projectId: 'portfolio-highlights',
            imageSrc: 'assets/images/portfolio/explosion.jpg'
        },
        {
            projectId: 'portfolio-highlights',
            imageSrc: 'assets/images/portfolio/fimfoDoor.jpg'
        },
        {
            projectId: 'portfolio-highlights',
            imageSrc: 'assets/images/portfolio/lightForest.jpg'
        },
        {
            projectId: 'portfolio-highlights',
            imageSrc: 'assets/images/portfolio/Meta_Cave.png'
        },
        {
            projectId: 'portfolio-highlights',
            imageSrc: 'assets/images/portfolio/MineVr.png'
        },
        {
            projectId: 'portfolio-highlights',
            imageSrc: 'assets/images/portfolio/office.png'
        },
        {
            projectId: 'portfolio-highlights',
            imageSrc: 'assets/images/portfolio/zoltar.jpg'
        }
    ],
    // Layout variations for different screen sizes
    layouts: {
        desktop: {
            columns: 12,
            rows: 6
        },
        tablet: {
            columns: 8,
            rows: 8
        },
        mobile: {
            columns: 4,
            rows: 6
        }
    }
};

// Visual effects configuration
export const effectsConfig = {
    cursor: {
        enabled: true,
        size: 16,
        growSize: 3,
        easeFactor: 0.2
    },
    backgroundGrid: {
        enabled: true,
        numLines: 50,
        opacity: 0.2,
        distortionFactor: 90
    },
    videoBackground: {
        enabled: true,
        selector: '.video-background video',
        muted: true,
        autoplay: true,
        loop: true,
        playbackRate: 0.8, // Slightly slower for better visual effect
        opacity: 0.7,
        mobileFallbackImage: 'assets/images/portfolio/lightForest.jpg' // Fallback image for mobile devices
    },
    workItems: {
        // The key change: Disable floating and mouse interaction temporarily
        floatingEnabled: true,
        mouseInteractionEnabled: true,
        floatStrength: {
            x: 15,
            y: 10
        },
        rotationStrength: 0.02,
        scaleOnHover: true,
        maxScale: 5
    }
};
