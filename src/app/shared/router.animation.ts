import { trigger, state, animate, style, transition } from "@angular/animations";

export function moveIn() {
    return trigger('moveIn', [
        state('void', style({position: 'fixed', width: '100%'})),
        state('*', style({position: 'fixed', width: '100%'})),
        transition(':enter', [
            style({opacity:'0', transition: 'translateX(100px)'}),
            animate('.3s ease-in-out', style({opacity:'1', transition: 'translateX(0)'}))
        ]),
        transition(':leave', [
            style({opacity:'1', transition: 'translateX(0)'}),
            animate('.3s ease-in-out', style({opacity:'0', transition: 'translateX(-200px)'}))
        ])
    ])
}
export function fallIn() {
    return trigger('fallIn', [
        transition(':enter', [
            style({opacity:'0', transition: 'translateY(40px)'}),
            animate('.3s ease-in-out', style({opacity:'1', transition: 'translateY(0)'}))
        ]),
        transition(':leave', [
            style({opacity:'1', transition: 'translateX(0)'}),
            animate('.3s ease-in-out', style({opacity:'0', transition: 'translateX(-200px)'}))
        ])
    ])
}