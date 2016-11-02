'use strict';

import aexpr from 'aexpr-interpretation';
import trigger from './../src/aexpr-trigger.js';

describe('Trigger for Active Expressions', () => {
    it("chainable", () => {
        let obj = {a: 2},
            spy = sinon.spy();

        let axp = aexpr(() => obj.a > 5, locals);
        trigger(axp)
            .onBecomeFalse(spy)
            .onBecomeTrue(spy)
            .onBecomeFalse(spy)
            .onBecomeTrue(spy);

        expect(spy).to.be.calledTwice;
    });

    it("flank up", () => {
        let obj = {a: 2},
            spy = sinon.spy();

        let axp = aexpr(() => obj.a > 5, locals);
        trigger(axp)
            .onBecomeTrue(spy);

        expect(spy).not.to.be.called;

        obj.a = 10;

        expect(spy).to.be.calledOnce;

        obj.a = 0;

        expect(spy).to.be.calledOnce;

        obj.a = 10;

        expect(spy).to.be.calledTwice;
    });

    it("immediately triggers onBecomeTrue", () => {
        let obj = {a: 7},
            spy = sinon.spy();

        let axp = aexpr(() => obj.a > 5, locals);
        trigger(axp)
            .onBecomeTrue(spy);

        expect(spy).to.be.calledOnce;

        obj.a = 0;

        expect(spy).to.be.calledOnce;

        obj.a = 10;

        expect(spy).to.be.calledTwice;
    });

    it("flank down", () => {
        let obj = {a: 2},
            spy = sinon.spy();

        let axp = aexpr(() => obj.a > 0, locals);
        trigger(axp)
            .onBecomeFalse(spy);

        expect(spy).not.to.be.called;

        obj.a = -2;

        expect(spy).to.be.calledOnce;

        obj.a = 2;

        expect(spy).to.be.calledOnce;

        obj.a = -2;

        expect(spy).to.be.calledTwice;
    });

    it("immediately triggers onBecomeFalse", () => {
        let obj = {a: -2},
            spy = sinon.spy();

        let axp = aexpr(() => obj.a > 0, locals);
        trigger(axp)
            .onBecomeFalse(spy);

        expect(spy).to.be.calledOnce;

        obj.a = 2;

        expect(spy).to.be.calledOnce;

        obj.a = -2;

        expect(spy).to.be.calledTwice;
    });

});
