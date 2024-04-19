package dev.sethaker.climbwithme.dao.daoInterface;

import dev.sethaker.climbwithme.model.Address;

import java.util.List;

public interface UserAddressDao {
    boolean insertUserAddress(int userId, Address userAddress);
    Address getUserDefaultAddress(int userId);
    List<Address> getUserAddresses(int userId);

    boolean deleteUserAddress(int userId, int addressId);

}
