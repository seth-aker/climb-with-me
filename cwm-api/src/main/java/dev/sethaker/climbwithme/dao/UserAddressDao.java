package dev.sethaker.climbwithme.dao;

import dev.sethaker.climbwithme.model.Address;

import java.util.List;

public interface UserAddressDao {
    List<Address> getUserAddresses(String userId);
    Address getDefaultUserAddress(String userId);
    Address addUserAddress(Address address);
    boolean editUserAddress(Address address);
    boolean deleteUserAddress(int AddressId);

}
