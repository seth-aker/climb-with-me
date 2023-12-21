package dev.sethaker.climbwithme.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ClimbingStyle {
    /**
     * Style Codes:
     * s = Sport,
     * b = Bouldering,
     * t = Trad,
     * r = Top Rope,
     */
    private Character styleCode;
    //eg 5.12a or V3
    private String experienceLevel;
    private boolean hasGear;
    private boolean preferred;
}

