package dev.sethaker.climbwithme.dao;

import dev.sethaker.climbwithme.model.Address;

import java.util.List;

public interface UserAddressDao {
    List<Address> getUserAddresses(int userId);
    Address getDefaultUserAddress(int userId);
    Address addUserAddress(Address address);
    boolean editUserAddress(Address address);
    boolean deleteUserAddress(int AddressId);

}
