package dev.sethaker.climbwithme.dao.daoInterface;

import dev.sethaker.climbwithme.model.Address;

public interface UserAddressDao {
    boolean insertUserAddress(int userId, Address userAddress);

}
