<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <meta name="description" content="Organiza y gestiona con facilidad torneos americanos de padel con nuestra plataforma">
        <meta name="keywords" content="padel, americano, torneo padel, torneo americano padel, torneo padel americano, torneo padel 4 personas, torneo padel 4 jugadores, torneo padel 8 personas, torneo padel 8 jugadores, torneo padel 12 personas, torneo padel 12 jugadores, organizar torneo padel, crear torneo padel, torneo padel amateur, ">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ config('app.url') }}">
        <meta property="og:title" content="{{ config('app.name') }}">
        <meta property="og:description" content="Organiza y gestiona con facilidad torneos americanos de padel con nuestra plataforma">
        <meta property="og:image" content="https://torneospadel.app/storage/ball.png">
        <meta property="og:type" content="website" />
        <meta property="og:image:type" content="image/png">
        <meta property="og:image:width" content="285">
        <meta property="og:image:height" content="290">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="{{ config('app.url') }}">
        <meta property="twitter:title" content="{{ config('app.name') }}">
        <meta property="twitter:description" content="Organiza y gestiona con facilidad torneos americanos de padel con nuestra plataforma">
        <meta property="twitter:image" content="https://torneospadel.app/storage/ball.png">

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">
        <link rel="manifest" href="/site.webmanifest">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet">


        @production
        <!-- Fathom - beautiful, simple website analytics -->
        <script src="https://cdn.usefathom.com/script.js" data-spa="auto" data-site="NUUYDOES" defer></script>
        <!-- / Fathom -->
        @endproduction

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
