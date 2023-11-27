package com.vishnugan.passenger.service;

import com.vishnugan.passenger.auth.AuthenticationResponse;
import com.vishnugan.passenger.auth.ResType;
import com.vishnugan.passenger.config.RideKafkaProducer;
import com.vishnugan.passenger.dto.PassengerRequestedRideEventDTO;
import com.vishnugan.passenger.entity.Ride;
import com.vishnugan.passenger.message.MessageRequest;
import com.vishnugan.passenger.repo.RideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RideService {

    private final RideKafkaProducer rideKafkaProducer;
    private final RideRepository rideRepository;

    public Ride createRide(PassengerRequestedRideEventDTO rideRequest) {

        Long passengerId = rideRequest.getPassengerId();

        // Check if there are ongoing rides for the given passengerId
        List<Ride> ongoingRides = rideRepository.findByPassengerIdAndStatusIn(passengerId, Arrays.asList("pending", "accepted"));

        if (!ongoingRides.isEmpty()) {
            throw new RuntimeException("Passenger already has ongoing rides.");
        }

        Ride ride = new Ride();

        ride.setPassengerId(rideRequest.getPassengerId());
        ride.setPickupLocation(rideRequest.getPickupLocation());
        ride.setDropLocation(rideRequest.getDropLocation());
        ride.setVehicleType(rideRequest.getVehicleType());
        ride.setStatus("pending");

        rideKafkaProducer.sendPassengerRequestedRideEvent(rideRequest);

        return rideRepository.save(ride);

    }

    public void updateRideStatus(Long rideId) {
        Ride ride = (Ride) rideRepository.findByRideId(rideId).orElseThrow();
        ride.setStatus("accepted");
        rideRepository.save(ride);
    }

    public void updateRideFinishStatus(Long rideId) {
        Ride ride = (Ride) rideRepository.findByRideId(rideId).orElseThrow();
        ride.setStatus("finished");
        rideRepository.save(ride);
    }


    public ResponseEntity<AuthenticationResponse> confirmation(Ride rideRequest) {
        Ride ride = (Ride) rideRepository.findByRideId(rideRequest.getRideId()).orElseThrow();
        if (ride.getStatus().equals("accepted")) {
            return ResponseEntity.ok(
                    AuthenticationResponse.builder()
                            .message("Ride Accepted")
                            .type(ResType.OK)
                            .build()
            );
        } else if (ride.getStatus().equals("finished")) {
            return ResponseEntity.ok(
                    AuthenticationResponse.builder()
                            .message("Ride Finished")
                            .type(ResType.OK)
                            .build()
            );
        } else {
            return ResponseEntity.ok(
                    AuthenticationResponse.builder()
                            .message("Ride Pending")
                            .type(ResType.OK)
                            .build()
            );
        }
    }
}
