
class Trigger {
    constructor(aexpr) {
        this.aexpr = aexpr;
    }

    onBecomeTrue(callback) {
        // setup dependency
        this.aexpr.onChange(bool => {
            if(bool) {
                callback();
            }
        });
        // check initial state
        if(this.aexpr.getCurrentValue()) {
            callback();
        }
    }

    onBecomeFalse(callback) {
        this.aexpr.onChange(bool => {
            if(!bool) {
                callback();
            }
        });
        if(!this.aexpr.getCurrentValue()) {
            callback();
        }
    }
}

export default function trigger(aexpr) {
    return new Trigger(aexpr);
}
