<?php

namespace App\Notifications;

use App\Models\Invitation;
use App\Models\Squad;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class UserInvitation extends Notification
{
    use Queueable;

    public $squad;

    public $user;

    public $invitation;

    /**
     * Create a new notification instance.
     */
    public function __construct(Squad $squad, User $user, Invitation $invitation)
    {
        $this->squad = $squad;
        $this->user = $user;
        $this->invitation = $invitation;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $url = URL::signedRoute('invitation.show', ['squad' => $this->squad->id, 'token' => $this->invitation->token]);

        return (new MailMessage)
            ->subject("Tienes una invitación a un torneo de padel")
            ->greeting('¡Te han invitado a un torneo de padel!')
            ->line("Hola, {$this->user->name}.")
            ->line("Tienes una invitación para un torneo de Padel pendiente de aceptar en el grupo {$this->squad->name}")
            ->action('Aceptar invitación', $url);
    }
}
