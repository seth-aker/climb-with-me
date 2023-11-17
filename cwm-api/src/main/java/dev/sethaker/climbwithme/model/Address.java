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
    @JsonAlias(value = "location_id")
    int locationId;
    @JsonAlias(value = "location_name")
    String locationName;
    String address;
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
