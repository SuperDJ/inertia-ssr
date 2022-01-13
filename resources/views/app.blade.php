<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=no">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="manifest" href="{{ asset('manifest.json') }}" />

    <base href="/">

    @inertiaHead
</head>

<body>
<noscript>This app requires JavaScript</noscript>

@routes

@inertia

<script src="{{ mix('js/app.js') }}" defer></script>
</body>
</html>
