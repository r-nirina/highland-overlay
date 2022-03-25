<template>
    <div :class="[ 'job-icon', role ]">
        <img
            :src="jobIcon"
            :alt="job"
        />
    </div>
</template>

<script>
import acn from "../../assets/images/acn.png"
import alc from "../../assets/images/alc.png"
import arc from "../../assets/images/arc.png"
import arm from "../../assets/images/arm.png"
import ast from "../../assets/images/ast.png"
import bishop from "../../assets/images/bishop.png"
import blm from "../../assets/images/blm.png"
import blu from "../../assets/images/blu.png"
import brd from "../../assets/images/brd.png"
import bsm from "../../assets/images/bsm.png"
import btn from "../../assets/images/btn.png"
import choco from "../../assets/images/choco.png"
import chocobo from "../../assets/images/chocobo.png"
import cnj from "../../assets/images/cnj.png"
import crp from "../../assets/images/crp.png"
import cul from "../../assets/images/cul.png"
import dnc from "../../assets/images/dnc.png"
import drg from "../../assets/images/drg.png"
import drk from "../../assets/images/drk.png"
import emerald from "../../assets/images/emerald.png"
import empty from "../../assets/images/empty.png"
import Eos from "../../assets/images/Eos.png"
import error from "../../assets/images/error.png"
import fsh from "../../assets/images/fsh.png"
import Garuda from "../../assets/images/Garuda.png"
import gla from "../../assets/images/gla.png"
import gld from "../../assets/images/gld.png"
import gnb from "../../assets/images/gnb.png"
import gsm from "../../assets/images/gsm.png"
import Ifrit from "../../assets/images/Ifrit.png"
import LimitBreak from "../../assets/images/Limit Break.png"
import lnc from "../../assets/images/lnc.png"
import ltw from "../../assets/images/ltw.png"
import mch from "../../assets/images/mch.png"
import min from "../../assets/images/min.png"
import mnk from "../../assets/images/mnk.png"
import mrd from "../../assets/images/mrd.png"
import nin from "../../assets/images/nin.png"
import pgl from "../../assets/images/pgl.png"
import pld from "../../assets/images/pld.png"
import pug from "../../assets/images/pug.png"
import rdm from "../../assets/images/rdm.png"
import rog from "../../assets/images/rog.png"
import rook from "../../assets/images/rook.png"
import rpr from "../../assets/images/rpr.png"
import sam from "../../assets/images/sam.png"
import sch from "../../assets/images/sch.png"
import Selene from "../../assets/images/Selene.png"
import sge from "../../assets/images/sge.png"
import smn from "../../assets/images/smn.png"
import thm from "../../assets/images/thm.png"
import Titan from "../../assets/images/Titan.png"
import topaz from "../../assets/images/topaz.png"
import war from "../../assets/images/war.png"
import whm from "../../assets/images/whm.png"
import wvr from "../../assets/images/wvr.png"

const jobIcons = {
    "acn": acn,
    "alc": alc,
    "arc": arc,
    "arm": arm,
    "ast": ast,
    "bishop": bishop,
    "blm": blm,
    "blu": blu,
    "brd": brd,
    "bsm": bsm,
    "btn": btn,
    "choco": choco,
    "chocobo": chocobo,
    "cnj": cnj,
    "crp": crp,
    "cul": cul,
    "dnc": dnc,
    "drg": drg,
    "drk": drk,
    "emerald": emerald,
    "empty": empty,
    "Eos": Eos,
    "error": error,
    "fsh": fsh,
    "Garuda": Garuda,
    "gla": gla,
    "gld": gld,
    "gnb": gnb,
    "gsm": gsm,
    "Ifrit": Ifrit,
    "lb": LimitBreak,
    "lnc": lnc,
    "ltw": ltw,
    "mch": mch,
    "min": min,
    "mnk": mnk,
    "mrd": mrd,
    "nin": nin,
    "pgl": pgl,
    "pld": pld,
    "pug": pug,
    "rdm": rdm,
    "rog": rog,
    "rook": rook,
    "rpr": rpr,
    "sam": sam,
    "sch": sch,
    "Selene": Selene,
    "sge": sge,
    "smn": smn,
    "thm": thm,
    "Titan": Titan,
    "topaz": topaz,
    "war": war,
    "whm": whm,
    "wvr": wvr,
}

export default {
    name: "JobIcon",

    props: {
        job: String,
        role: String,
    },

    computed: {
        jobIcon: function() {
            return (jobIcons[this.job] || empty)
        },
    },
}
</script>

<style lang="scss" scoped>
.job-icon {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    &.tank {
        background-color: rgba(74, 108, 218, 0.5);
    }
    &.healer {
        background-color: rgba(59, 169, 74, 0.5);
    }
    &.melee,
    &.ranged,
    &.caster {
        background-color: rgba(190, 80, 80, 0.5);
    }
    /*
    &.ranged {
    	background-color: rgba(223, 170, 85, 0.5);
    }
    &.caster {
    	background-color: rgba(142, 101, 161, 0.5);
    }
    */

    img {
        max-width: 20px;
        width: auto;
        max-height: 20px;
        height: auto;
    }
}
</style>
