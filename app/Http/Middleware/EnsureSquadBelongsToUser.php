<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureSquadBelongsToUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        $hasRelation = User::where('id', $user->id)->whereHas('squads', function ($query) use ($request) {
            $query->where('squads.id', $request->route('squad')->id);
        })->first();

        if (!$hasRelation) {
            return redirect('/');
        }

        return $next($request);
    }
}
