<?php

namespace App\Providers;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\ServiceProvider;
use Mixpanel;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(Mixpanel::class, function (Application $app) {
            return Mixpanel::getInstance(env('MIXPANEL_TOKEN'), ["host" => "api-eu.mixpanel.com"]);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Mixpanel::getInstance(env('MIXPANEL_TOKEN'), ["host" => "api-eu.mixpanel.com"]);
    }
}
