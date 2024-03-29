package dev.sethaker.climbwithme.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Address {

    private int addressId;

    @JsonAlias(value = "full_address")
    private String fullAddress;

    @JsonAlias(value = "address_line_1")
    private String addressLine1;

    @JsonAlias(value = "address_line_2")
    private String addressLine2;

    @JsonAlias(value = "address_line_3")
    private String addressLine3;

    private String city;

    @JsonAlias(value = "state_province")
    private String stateProvince;

    @JsonAlias(value = "postal_code")
    private String postalCode;

    private String country;

    @JsonAlias(value = "is_default")
    private Boolean isDefault;
}
