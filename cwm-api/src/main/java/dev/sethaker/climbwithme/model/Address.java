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
    @JsonAlias(value = "address_id")
    int addressId;
    @JsonAlias(value = "address_line_1")
    String addressLine1;
    @JsonAlias(value = "address_line_2")
    String addressLine2;
    String city;
    @JsonAlias(value = "state_province")
    String stateProvince;
    @JsonAlias(value = "postal_code")
    int postalCode;
    String country;
    @JsonAlias(value = "is_default")
    private Boolean isDefault;
}
